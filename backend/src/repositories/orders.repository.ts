import { pgPool } from "../config/db.js";
import { OrderRow, UserOrderDTO, UserOrderRow } from "../types/orders/types.js";
import { ApiError } from "../types/errors.js";

export class OrderRepository {
  cancelUserOrderById = async (id: number, userId: number) => {
    const sql = `INSERT INTO order_status_history(res_id,status,changed_by,changed_at)
                 SELECT r.res_id, 'cancelled', $2, NOW()
                 FROM reservations r where r.res_id = $1 
                 AND r.user_id = $2 
                 RETURNING *;`;
    const result = await pgPool.query(sql, [id, userId]);
    return result.rows[0] ?? null;
  };

  updateStatusByAdmin = async (
    orderId: number,
    nextStatus: "pending" | "confirmed" | "completed" | "cancelled",
    adminUserId: number,
  ) => {
    const client = await pgPool.connect();
    try {
      await client.query("BEGIN");
      const updated = await client.query(
        `UPDATE reservations
            SET res_status = $1
          WHERE res_id = $2
          RETURNING res_id, res_status`,
        [nextStatus, orderId],
      );
      if (updated.rowCount === 0) {
        await client.query("ROLLBACK");
        return null;
      }
      const history = await client.query(
        `INSERT INTO order_status_history(res_id, status, changed_by, changed_at)
         VALUES ($1, $2, $3, NOW())
         RETURNING history_id, status, changed_at, changed_by`,
        [orderId, nextStatus, adminUserId],
      );
      await client.query("COMMIT");
      return {
        resId: Number(updated.rows[0].res_id),
        status: updated.rows[0].res_status as string,
        history: history.rows[0],
      };
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  };
  async fullOrdersScan() {
    const result = await pgPool.query<UserOrderRow>(
      `
    SELECT 
      r.res_id,
      u.user_email,
      r.no_persons,
      r.event_name,
      r.equipement_loaned,
      r.equipement_returned,
      r.event_date,
      r.total_price,
      r.res_status AS status,

      osh.changed_at,
      osh.changed_by,

      COALESCE(
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'menu_id', rm.menu_id,
            'unit_price', rm.unit_price_snapshot,
            'themes', COALESCE(themes.themes, '[]'::jsonb)
          )
        ) FILTER (WHERE rm.menu_id IS NOT NULL),
        '[]'::jsonb
      ) AS menus

    FROM reservations r

    LEFT JOIN users u ON u.user_id = r.user_id

    LEFT JOIN LATERAL (
      SELECT 
        osh.changed_at,
        osh.changed_by
      FROM order_status_history osh
      WHERE osh.res_id = r.res_id
      ORDER BY osh.changed_at DESC
      LIMIT 1
    ) osh ON true

    LEFT JOIN reservation_menus rm 
      ON r.res_id = rm.res_id

    LEFT JOIN LATERAL (
      SELECT jsonb_agg(t.theme_name ORDER BY t.theme_name) AS themes
      FROM menu_themes mt
      JOIN themes t ON t.theme_id = mt.theme_id
      WHERE mt.menu_id = rm.menu_id
    ) themes ON true

    GROUP BY
      r.res_id,
      u.user_email,
      r.no_persons,
      r.event_name,
      r.equipement_loaned,
      r.equipement_returned,
      r.event_date,
      r.total_price,
      r.res_status,
      osh.changed_at,
      osh.changed_by

    ORDER BY r.event_date DESC, r.res_id DESC
    `,
    );

    return result.rows;
  }
  async findByUser(id: number): Promise<UserOrderDTO[]> {
    console.log("USING NEW findByUser SQL VERSION");
    const result = await pgPool.query<UserOrderRow>(
      `
    SELECT 
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

      COALESCE(
        (
          SELECT string_agg(t.theme_name, ', ' ORDER BY t.theme_name)
          FROM menu_themes mt
          JOIN themes t ON t.theme_id = mt.theme_id
          WHERE mt.menu_id = rm.menu_id
        ),
        ''
      ) AS theme

    FROM reservations r

    LEFT JOIN LATERAL (
      SELECT 
        osh.status,
        osh.changed_at,
        osh.changed_by
      FROM order_status_history osh
      WHERE osh.res_id = r.res_id
      ORDER BY osh.changed_at DESC
      LIMIT 1
    ) osh ON true

    LEFT JOIN reservation_menus rm 
      ON r.res_id = rm.res_id

    WHERE r.user_id = $1

    ORDER BY r.event_date DESC, r.res_id DESC
    `,
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

      history: row.status
        ? [
            {
              status: row.status,
              changedAt: row.changed_at,
              changedBy:
                row.changed_by === null || row.changed_by === undefined
                  ? null
                  : Number(row.changed_by),
            },
          ]
        : [],
    }));
  }
  deleteOrderById = async (orderId: number) => {
    try {
      const sql = `DELETE FROM reservations where res_id = $1 RETURNING res_id`;
      const result = await pgPool.query(sql, [orderId]);
      if (!result.rowCount) {
        throw new ApiError(404, "Id doesn`t exist", false);
      }
      console.log("deleted order: ", result);
      return result.rows[0];
    } catch (e) {
      throw new ApiError(404, String(e), false);
    }
  };
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
                  r.res_status AS status
                FROM reservations r
                WHERE r.res_id = $1`;

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
        changed_at,
        changed_by
      )
      VALUES ($1, 'pending', NOW(),$2)
      `,
        [reservationId, userId],
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
