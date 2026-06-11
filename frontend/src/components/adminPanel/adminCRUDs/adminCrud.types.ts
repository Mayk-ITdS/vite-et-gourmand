export type AdminColumnType =
  | "text"
  | "number"
  | "currency"
  | "boolean"
  | "image"
  | "date";

export type AdminFieldType =
  | "text"
  | "email"
  | "password"
  | "textarea"
  | "number"
  | "select"
  | "multiselect"
  | "boolean"
  | "image"
  | "date";
export type AdminOption = {
  label: string;
  value: string | number;
};
export type AdminColumn = {
  key: string;
  label: string;
  type?: AdminColumnType;
};
export type AdminOptionValue = string | number;

export type AdminFormValue = string | number | boolean | null | AdminOptionValue[];
export type AdminField = {
  name: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  options?: AdminOption[];
  placeholder?: string;
  mode?: "url" | "file";
};

export type AdminResource = {
  key: string;
  idKey: string;
  label: string;
  endpoint: string;
  columns: AdminColumn[];
  fields: AdminField[];
  permissions?: AdminResourcePermissions;
  rowActions?: AdminRowAction[];
};

export type AdminResourcePermissions = {
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
};

export type AdminRowActionVariant = "default" | "success" | "danger";
export type AdminRowActionMethod = "patch" | "post" | "delete";

export type AdminRowAction = {
  key: string;
  label: string;
  variant?: AdminRowActionVariant;
  method: AdminRowActionMethod;
  /** Builds the request path from the row, e.g. `/reviews/${row._id}/approve`. */
  buildPath: (row: AdminRow) => string;
  /** Static request body sent with the action (e.g. `{ status: "confirmed" }`). */
  body?: Record<string, unknown>;
  /** When set, opens a dialog to capture a reason injected into the body as `reason`. */
  promptReason?: {
    title: string;
    description?: string;
    label?: string;
    defaultValue?: string;
    confirmLabel?: string;
  };
  /** When set (and no prompt), shows a confirmation dialog before running. */
  confirm?: {
    title: string;
    description?: string;
    confirmLabel?: string;
  };
};

export type AdminId = string | number;

export type AdminRow = Record<string, unknown>;

export type AdminFormData = Record<string, AdminFormValue>;
