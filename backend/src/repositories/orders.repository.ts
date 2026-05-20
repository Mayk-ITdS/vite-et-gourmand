import { date } from "zod";
import { pgPool } from "../config/db.js";
import { OrderRow, UserOrderDTO, UserOrderRow } from "../types/orders/types.js";

export class OrderRepository {
  async findByUser(id: number): Promise<UserOrderDTO[]> {
    const result = await pgPool.query<UserOrderRow>(
      `SELECT 
                          r.res_id,
                          r.no_persons,
                          r.event_name,
                          r.equipement_loaned,
                          r.equipement_returned,
                          r.event_date,
                          r.total_price,
                          osh.status,
                          osh.changed_at,
                          osh.changed_by,
                          rm.menu_id,
                          rm.unit_price_snapshot,
                          (
                           Select t.theme_name from menu_themes mt
                           join themes t ON t.theme_id = mt.theme_id
                           where mt.menu_id = rm.menu_id
                           ) as theme
                            FROM reservations r left join lateral 
                            (
                            Select osh.status, osh.changed_at,osh.changed_by
                            from order_status_history osh
                            where r.res_id = osh.res_id 
                            order by 
                            osh.changed_at DESC
                            ) osh on 
                             true
                            left join reservation_menus rm on 
                            r.res_id = rm.res_id 
                            WHERE user_id = $1
                            Order by r.event_date DESC, r.res_id DESC`,
      [id],
    );

    return result.rows.map((row) => ({
      resId: Number(row.res_id),
      noPersons: Number(row.no_persons),
      eventName: row.event_name,
      equipmentLoaned: row.equipement_loaned,
      equipmentReturned: row.equipement_returned,
      eventDate: row.event_date,
      totalPrice: Number(row.total_price),
      menuId: Number(row.menu_id),
      unitPriceSnapshot: Number(row.unit_price_snapshot),
      theme: row.theme,
      history: {
        status: row.status,
        changedAt: row.changed_at,
        changedBy: Number(row.changed_by),
      },
    }));
  }
  async findMenusByIds(ids: number[]) {
    const sql = `SELECT menu_id, prix_unitaire, min_persons
                FROM menus
                WHERE menu_id = ANY($1)`;

    const result = pgPool.query(sql, [ids]);
    return (await result).rows;
  }

  async findOrderById(id: number): Promise<OrderRow | null> {
    const sql = `SELECT
                r.res_id,
                r.event_date,
                r.res_status,
                r.total_price,
                m.menu_id,
                m.menu_name,
                m.image_url,
                jsonb_build_object(m.images::jsonb) as gallery
                FROM reservations r
                JOIN menus m ON r.menu_id = m.menu_id
                LEFT JOIN menu_gallery g ON g.menu_id = m.menu_id
                WHERE r.user_id = $1
                GROUP BY r.res_id, m.menu_id
                ORDER BY r.date_res_for DESC;`;

    const result = await pgPool.query<OrderRow>(sql, [id]);
    if (!result.rowCount) {
      return null;
    }
    return result.rows[0];
  }
  async createReservationTransaction(
    userId: number,
    prestation: {
      city: string;
      streetName: string;
      streetNumber: number;
      zipCode: string;
      date: string;
      time: string;
      distanceKm: number;
    },
    menus: { menuId: number; quantity: number }[],
    pricing: { totalTTC: number },
  ) {
    const client = await pgPool.connect();
    console.log(
      "Jestesmy w orders.repository w funkcji createReservationTransaction:",
      userId,
    );

    try {
      await client.query("BEGIN");

      const reservationResult = await client.query(
        `
        WITH 
        new_reservation 
        AS(
        INSERT INTO 
        reservations 
        (
        user_id,
        no_persons,
        date_res_made,
        event_date,
        res_status,
        equipement_loaned,
        equipement_returned,
        total_price
       )   
      VALUES (
      $1, 
      $2, 
      CURRENT_DATE, 
      $3, 
      'pending', 
      false, 
      false, 
      $4
      )
      RETURNING res_id
      ),
      new_address AS (
        INSERT INTO reservation_addresses(
        res_id,
        city,
        zip_code,
        street_name,
        street_number
        )
        SELECT
        nr.res_id,
        $5,
        $6,
        $7,
        $8
        FROM new_reservation nr
      )
        SELECT res_id
        FROM new_reservation;

      `,
        [
          userId,
          menus.reduce((sum, m) => sum + m.quantity, 0),
          prestation.date,
          pricing.totalTTC,
          prestation.city,
          prestation.zipCode,
          prestation.streetName,
          prestation.streetNumber,
        ],
      );

      const reservationId = reservationResult.rows[0].res_id;

      for (const menu of menus) {
        const result = await client.query(
          `
        INSERT INTO reservation_menus (
          res_id,
          menu_id,
          unit_price_snapshot,
          quantity
        )
        SELECT $1, m.menu_id, m.prix_unitaire, $2
        FROM menus m
        WHERE m.menu_id = $3
        Returning menu_id
        `,
          [reservationId, menu.quantity, menu.menuId],
        );
        if (result.rowCount === 0) {
          throw new Error("Menu not found");
        }
      }
      await client.query(
        `
      INSERT INTO order_status_history (
        res_id,
        status,
        changed_at
      )
      VALUES ($1, 'pending', NOW())
      `,
        [reservationId],
      );

      await client.query("COMMIT");
      const check = await client.query(
        "SELECT res_id FROM reservations ORDER BY res_id DESC LIMIT 1",
      );
      console.log("LAST RES FROM DB:", check.rows);

      return {
        reservationId,
        menus,
        totalPrice: pricing.totalTTC,
        status: "pending",
        date: prestation.date,
        peopleCount: menus.reduce((sum, m) => sum + m.quantity, 0),
      };
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
}
