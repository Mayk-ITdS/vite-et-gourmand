import { jwt, map, overwrite } from "zod";
import { getDBMongo } from "../config/db.js";
import { privateEncrypt } from "node:crypto";
import buildStockPayload, { StockDTO, StockMode } from "../dtos/ingest.dto.js";
import { ApiError } from "../types/users.js";
import { StockRepository } from "../repositories/StockRepository.js";
import { ZodMiniCustomStringFormat, ZodMiniNonOptional } from "zod/mini";
import { IngestProductsQuery } from "../types/stock.js";

type MenuStatsDoc = {
  _id?: unknown;
  menuId: number;
  timesOrdered: number;
  totalRevenue: number;
};

type MonthlyStatsDoc = {
  _id?: unknown;
  menuId: number;
  year: number;
  month: number;
  monthlyRevenue: number;
  ordersCount: number;
};

type StatusStatsDoc = {
  _id?: unknown;
  status: string;
  count: number;
};

class AdminAnalyticsService {
  constructor(private stockRep = new StockRepository()) {}

  async registerOrder(order: { menuId: number; totalPrice: number; status: string; date: Date }) {
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
        { upsert: true }
      );

      await db.collection("monthlystats").updateOne(
        { menuId: order.menuId, year, month },
        {
          $inc: {
            monthlyRevenue: order.totalPrice,
            ordersCount: 1,
          },
        },
        { upsert: true }
      );

      await db
        .collection("statusstats")
        .updateOne({ status: order.status }, { $inc: { count: 1 } }, { upsert: true });

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
    console.info("Wolamy admin analitics");
    const [menus, monthlyPerMenu, statuses] = await Promise.all([
      db.collection<MenuStatsDoc>("menustats").find().sort({ timesOrdered: -1 }).toArray(),

      db.collection<MonthlyStatsDoc>("monthlystats").find().toArray(),

      db.collection<StatusStatsDoc>("statusstats").find().toArray(),
    ]);

    const totalRevenue = menus.reduce((sum, m) => sum + (Number(m.totalRevenue) || 0), 0);
    const months = monthlyPerMenu.map((m) => ({
      menuId: m.menuId,
      year: m.year,
      month: m.month,
      monthlyRevenue: m.monthlyRevenue,
      ordersCount: m.ordersCount,
    }));

    const totalOrders = statuses.reduce((sum, m) => sum + (Number(m.count) || 0), 0);

    const averageRevenue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const topMenuId = menus.length > 0 ? menus[0].menuId : null;
    console.info("I zwracamy dane");
    return {
      overview: {
        totalRevenue,
        totalOrders,
        averageRevenue,
        topMenuId,
      },
      months,
      menus,
      statuses,
    };
  }
  ingestDelivery = async (mode: StockMode, payload: IngestProductsQuery["payload"]) => {
    try {
      const result = await this.stockRep.ingestStock(mode, payload);
      return result;
    } catch (err: any) {
      console.error("REAL ERROR IN SERVICE:");
      console.error("message:", err?.message);
      console.error("code:", err?.code);
      console.error("detail:", err?.detail);
      console.error("where:", err?.where);
      console.error("stack:", err?.stack);
      throw new ApiError(400, String(err), false);
    }
  };
}
export default new AdminAnalyticsService();
