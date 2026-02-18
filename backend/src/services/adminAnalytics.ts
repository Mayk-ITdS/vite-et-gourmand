import { MenuStats } from "../models/menuStats.model.js";
import { MonthlyStats } from "../models/monthlyStats.model.js";
import { StatusStats } from "../models/statusStats.model.js";

export default class AdminAnalyticsService {
  async registerOrder(order: {
    menuId: number;
    totalPrice: number;
    status: string;
    date: Date;
  }) {
    console.log("REGISTER ORDER CALLED:", order);

    const year = order.date.getFullYear();
    const month = order.date.getMonth() + 1;

    try {
      const res = await MenuStats.findOneAndUpdate(
        { menuId: order.menuId },
        {
          $inc: {
            timesOrdered: 1,
            totalRevenue: order.totalPrice,
          },
        },
        { upsert: true },
      );

      console.log("MENUSTATS RESULT:", res);
    } catch (err) {
      console.error("MONGO ERROR:", err);
    }
  }

  async getFullDashboard() {
    const [menus, months, statuses] = await Promise.all([
      MenuStats.find().sort({ timesOrdered: -1 }),
      MonthlyStats.find().sort({ year: 1, month: 1 }),
      StatusStats.find(),
    ]);

    return {
      menus,
      months,
      statuses,
    };
  }
}
