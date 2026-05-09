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
};
export type AdminId = string | number;

export type AdminRow = Record<string, unknown>;

export type AdminFormData = Record<string, AdminFormValue>;
