import { setupMaster } from "node:cluster";
import { pgPool } from "../config/db.js";
import { OrderRow } from "../types/orders/types.js";

export class OrderRepository {
  async findByUser(id: number) {
    return pgPool.query(`SELECT * FROM reservations WHERE user_id = $1`, [id]);
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
                r.date_res_for,
                r.res_status,
                r.total_price,
                m.menu_id,
                m.menu_name,
                m.main_image,
                json_agg(g.image_url) as gallery
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
      address: string;
      city: string;
      date: string;
      time: string;
    },
    menus: { menuId: number; quantity: number }[],
    pricing: { totalTTC: number }
  ) {
    const client = await pgPool.connect();
    console.log("Jestesmy w orders.repository w funkcji createReservationTransaction:", userId);

    try {
      await client.query("BEGIN");

      const reservationResult = await client.query(
        `
      INSERT INTO reservations (
        user_id,
        no_persons,
        event_adress,
        date_res_made,
        event_date,
        res_status,
        equipement_loaned,
        equipement_returned,
        total_price
      )
      VALUES ($1, $2, $3, CURRENT_DATE, $4, 'pending', false, false, $5)
      RETURNING res_id
      `,
        [
          userId,
          menus.reduce((sum, m) => sum + m.quantity, 0),
          prestation.address,
          prestation.date,
          pricing.totalTTC,
        ]
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
          [reservationId, menu.quantity, menu.menuId]
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
        [reservationId]
      );

      await client.query("COMMIT");
      const check = await client.query(
        "SELECT res_id FROM reservations ORDER BY res_id DESC LIMIT 1"
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
