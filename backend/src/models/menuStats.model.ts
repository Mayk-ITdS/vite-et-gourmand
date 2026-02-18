import mongoose from "mongoose";

const MenuStatsSchema = new mongoose.Schema({
  menuId: { type: Number, required: true, unique: true },
  menuName: { type: String, required: true },
  timesOrdered: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
});

export const MenuStats = mongoose.model("MenuStats", MenuStatsSchema);
