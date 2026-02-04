import mongoose from "mongoose";
import { ENV } from "./env.js";
import { Pool } from "pg";
export const pgPool = new Pool({
  host: ENV.PG.HOST,
  port: ENV.PG.PORT,
  user: ENV.PG.USER,
  password: ENV.PG.PASSWORD,
  database: ENV.PG.DB,
});
export const connectPostgres = async (retries = 10) => {
  while (retries) {
    try {
      await pgPool.query("Select 1");
      console.log("Postgres Connected");
      return;
    } catch (err) {
      retries -= 1;
      console.log("Waiting for Postgres...", retries);
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
};
export const connectMongo = async () => {
  await mongoose.connect(ENV.MONGO_URI_ADMIN);
};
