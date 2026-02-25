import { ENV } from "./env.js";
import { Pool } from "pg";
import { MongoClient, Db } from "mongodb";
import { ApiError } from "../types/users.js";
export const pgPool = new Pool({
  host: ENV.PG.HOST,
  port: ENV.PG.PORT,
  user: ENV.PG.USER,
  password: ENV.PG.PASSWORD,
  database: ENV.PG.DB,
});
console.log("PG_HOST", ENV.PG.HOST);
console.log("PG_PORT", ENV.PG.PORT);
console.log(ENV.PG.DB);
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
console.log("MONGO URI:", process.env.MONGO_URI_ADMIN);
let clientMongo: MongoClient;
let dbMongo: Db;
export const connectMongo = async () => {
  const uri = process.env.MONGO_URI_ADMIN;

  if (!uri) {
    throw new Error("Mongo URI not defined");
  }
  clientMongo = new MongoClient(uri);
  await clientMongo.connect();
  dbMongo = clientMongo.db("vites");
  console.log("Mongo Connected");
};
export const getDBMongo = () => {
  if (!dbMongo) throw new ApiError(500, "db connection failed", false);
  return dbMongo;
};
