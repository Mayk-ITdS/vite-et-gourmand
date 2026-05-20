import pino from "pino";
import { pgPool } from "./db.js";
import { ENV } from "./env.js";

export const createAdmin = async () => {
  const sql1 = `SELECT EXISTS (Select 1 from administration) from administration`;
  const exists = await pgPool.query(sql1);
  if (exists.rowCount && exists.rows[0]) return;
  const sql = `SELECT public.hash_admin($1,$2,$3)`;
  const [adm_name, email, pass] = [
    ENV.PG.ADMIN_NAME,
    ENV.PG.ADMIN_EMAIL,
    ENV.PG.ADMIN_PASS,
  ];
  const result = await pgPool.query(sql, [adm_name, email, pass]);
  const logger = pino();
  logger.debug(result.rows[0]);
};
