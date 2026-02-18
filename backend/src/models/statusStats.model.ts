import mongoose from "mongoose";

const StatusStatsSchema = new mongoose.Schema({
  status: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
});

export const StatusStats = mongoose.model("StatusStats", StatusStatsSchema);
