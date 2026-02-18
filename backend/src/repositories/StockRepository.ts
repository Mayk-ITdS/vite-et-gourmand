import { pgPool } from "../config/db.js";
import type { IngestProductsQuery, IngestResponse } from "../types/stock.js";

class StockRepository {
  async ingestStock(
    mode: IngestProductsQuery["mode"],
    payload: IngestProductsQuery["payload"],
  ): Promise<IngestResponse> {
    const query = `SELECT public.ingest_stock($1,$2) as result`;
    const { rows } = await pgPool.query(query, [mode, payload]);
    return rows[0].result;
  }
}
export { StockRepository };
