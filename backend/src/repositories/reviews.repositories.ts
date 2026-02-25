import { getDBMongo, pgPool } from "../config/db.js";
import AdminAnalyticsService from "../services/adminAnalytics.js";
import { ObjectId } from "mongodb";

console.log("REVIEWS REPO FILE LOADED");

export class ReviewsRepository {
  private get collection() {
    return getDBMongo().collection<ReviewUser>("reviews");
  }
  analytics = new AdminAnalyticsService();

  async createReview(resId: number, rating: number, comment: string) {
    console.log("PG CREATE REVIEW CALLED");
    const client = await pgPool.connect();

    let rows;

    try {
      await client.query("BEGIN");

      await client.query(
        `INSERT INTO reviews (res_id, rating, comment)
       VALUES ($1, $2, $3)`,
        [resId, rating, comment],
      );

      const result = await client.query(
        `
      SELECT r.res_status,
             rm.menu_id,
             rm.unit_price_snapshot,
             rm.quantity,
             r.event_date
      FROM reservations r
      JOIN reservation_menus rm ON rm.res_id = r.res_id
      WHERE r.res_id = $1
      `,
        [resId],
      );

      rows = result.rows;
      console.log("ROWS FROM PG:", rows);
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }

    for (const row of rows) {
      if (row.res_status === "completed") {
        await this.analytics.registerOrder({
          menuId: row.menu_id,
          totalPrice: row.unit_price_snapshot * row.quantity,
          status: "completed",
          date: row.event_date,
        });
      }
    }
  }

  async insertOne(data: ReviewUser) {
    return await this.collection.insertOne(data);
  }

  async findByOrderId(orderId: number) {
    return await this.collection.findOne({ orderId });
  }

  async findAll() {
    return await this.collection.find().toArray();
  }
  async findPending() {
    return await this.collection
      .find({ isApproved: false })
      .sort({ createdAt: -1 })
      .toArray();
  }

  async approve(id: string) {
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isApproved: true } },
    );
  }

  async deleteReview(id: string) {
    return await this.collection.deleteOne({
      _id: new ObjectId(id),
    });
  }
}

export interface ReviewUser {
  orderId: number;
  pseudo: string;
  content: string;
  score: number;
  avatar?: string | null;
  createdAt?: Date;
  isApproved?: boolean;
}
