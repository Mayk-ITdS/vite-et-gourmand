import { pgPool } from "../config/db.js";
import mapPostgresError from "../funcs/mapPostgresError.js";
import type { IngestProductsQuery, IngestResponse } from "../types/stock.js";
import { ApiError } from "../types/users.js";

class StockRepository {
  async ingestStock(
    mode: IngestProductsQuery["mode"],
    payload: IngestProductsQuery["payload"],
  ): Promise<IngestResponse> {
    const query = `SELECT public.ingest_stock($1,$2) as result`;
    const { rows } = await pgPool.query(query, [mode, JSON.stringify(payload)]);
    return rows[0].result;
  }
  async fetchAllProducts() {
    try {
      const sql = `Select * from public.products_stock_view;`;
      const result = await pgPool.query(sql);
      if (result.rowCount === 0) {
        throw new ApiError(400, "No products en stock", true);
      }
      return result.rows;
    } catch (e) {
      if (e instanceof ApiError) {
        throw new ApiError(404, "No products available", true);
      }
      throw mapPostgresError(e);
    }
  }
}
export { StockRepository };
