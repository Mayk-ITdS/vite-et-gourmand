interface IngestProductsQuery {
  mode: "lineage" | "synthesis";
  payload: Record<string, unknown>;
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
