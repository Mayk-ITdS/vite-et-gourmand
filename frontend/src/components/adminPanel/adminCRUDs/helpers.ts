const toDisplayString = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "—";

  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "Oui" : "Non";

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

export default toDisplayString;
