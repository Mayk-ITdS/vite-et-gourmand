import mongoose from "mongoose";

const MonthlyStatsSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  totalRevenue: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
});

MonthlyStatsSchema.index({ year: 1, month: 1 }, { unique: true });

export const MonthlyStats = mongoose.model("MonthlyStats", MonthlyStatsSchema);
