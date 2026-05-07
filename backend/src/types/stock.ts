import { StockDTO } from "../dtos/ingest.dto.js";
import buildStockPayload from "../funcs/buildStockPayload.js";

interface IngestProductsQuery {
  mode: "lineage" | "synthesis";
  payload: ReturnType<typeof buildStockPayload>;
}
interface IngestResponse {
  mode: "lineage" | "synthesis";
  created_lot_ids?: number[];
  created_product_lot_id?: number;
  links_created: number;
}
interface DBRow {
  result: IngestResponse;
}
export { type IngestProductsQuery, type IngestResponse, type DBRow };
