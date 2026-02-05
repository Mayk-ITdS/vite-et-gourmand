type Method = "get" | "post" | "put" | "delete" | "patch";
interface RequestOptions {
  method?: Method;
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  url: string;
}
export { type RequestOptions };
