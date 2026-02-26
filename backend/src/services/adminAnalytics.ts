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

      await db.collection("monthlystats").updateOne(
        { menuId: order.menuId, year, month },
        {
          $inc: {
            monthlyRevenue: order.totalPrice,
            ordersCount: 1,
          },
        },
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

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const [menus, monthlyPerMenu, statuses] = await Promise.all([
      db.collection("menustats").find().sort({ timesOrdered: -1 }).toArray(),

      db.collection("monthlystats").find({ year, month }).toArray(),

      db.collection("statusstats").find().toArray(),
    ]);

    const monthlyMap = new Map(
      monthlyPerMenu.map((m) => [m.menuId, m.monthlyRevenue]),
    );

    const enrichedMenus = menus.map((menu) => ({
      ...menu,
      monthlyRevenue: monthlyMap.get(menu.menuId) || 0,
    }));

    const totalRevenue = enrichedMenus.reduce(
      (sum, m) => sum + (m.monthlyRevenue || 0),
      0,
    );

    const totalOrders = enrichedMenus.reduce(
      (sum, m) => sum + (Number(m._id) || 0),
      0,
    );

    const averageRevenue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const topMenuId = enrichedMenus.length > 0 ? enrichedMenus[0]._id : null;

    return {
      overview: {
        totalRevenue,
        totalOrders,
        averageRevenue,
        topMenuId,
      },
      menus: enrichedMenus,
      statuses,
    };
  }
}
