import pino from "pino";
import { pgPool } from "./db.js";
import { ENV } from "./env.js";
const logger = pino();

export const createAdmin = async () => {
  const sql1 = `SELECT EXISTS (Select 1 from administration) as exists`;
  const exists = await pgPool.query(sql1);
  if (exists.rows[0]?.exists) {
    logger.info("Admin bootstrap skipped: admin already exists");
    return;
  }
  const sql = `SELECT public.hash_admin($1,$2,$3)`;
  const [adm_name, email, pass] = [
    ENV.PG.ADMIN_NAME,
    ENV.PG.ADMIN_EMAIL,
    ENV.PG.ADMIN_PASS,
  ];
  await pgPool.query(sql, [adm_name, email, pass]);

  logger.info("Admin bootstrap completed");
};
