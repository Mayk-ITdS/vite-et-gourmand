export type ClientError =
  | {
      kind: "api";
      status: number;
      message: string;
      code?: string;
      details?: unknown;
    }
  | { kind: "network"; message: string }
  | { kind: "timeout"; message: string }
  | { kind: "unknown"; message: string; raw?: unknown };
