import { getDBMongo } from "../config/db.js";

export default class AdminAnalyticsService {
  async registerOrder(order: {
    menuId: number;
    totalPrice: number;
    status: string;
    date: Date;
  }) {
    console.log("ANALYTICS FUNCTION ENTERED");

    const db = getDBMongo();
    const year = order.date.getFullYear();
    const month = order.date.getMonth() + 1;

    try {
      await db.collection("menustats").updateOne(
        { menuId: order.menuId },
        {
          $inc: {
            timesOrdered: 1,
            totalRevenue: order.totalPrice,
          },
        },
        { upsert: true },
      );

      await db
        .collection("monthlystats")
        .updateOne(
          { year, month },
          { $inc: { totalRevenue: order.totalPrice, oredersCount: 1 } },
          { upsert: true },
        );

      await db
        .collection("statusstats")
        .updateOne(
          { status: order.status },
          { $inc: { count: 1 } },
          { upsert: true },
        );

      console.log("ANALYTICS UPDATED SUCCESSFULLY");
    } catch (err) {
      console.error("MONGO NATIVE ERROR:", err);
    }
  }

  async getFullDashboard() {
    const db = getDBMongo();

    const [menus, months, statuses] = await Promise.all([
      db.collection("menustats").find().sort({ timesOrdered: -1 }).toArray(),
      db
        .collection("monthlystats")
        .find()
        .sort({ year: 1, month: 1 })
        .toArray(),
      db.collection("statusstats").find().toArray(),
    ]);

    return {
      menus,
      months,
      statuses,
    };
  }
}
