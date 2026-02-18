import axios from "axios";

import type { ClientError } from "@/types/errors";

export function toClientError(err: unknown): ClientError {
  if (axios.isAxiosError(err)) {
    if (err.code === "ECONNABORTED")
      return { kind: "timeout", message: "Timeout" };
    if (!err.response) return { kind: "network", message: "No network / CORS" };

    const status = err.response.status;
    const data = err.response.data;

    return {
      kind: "api",
      status,
      message: data?.message ?? err.message ?? "API error",
      code: data?.code,
      details: data,
    };
  }

  return { kind: "unknown", message: "Unexpected error", raw: err };
}
