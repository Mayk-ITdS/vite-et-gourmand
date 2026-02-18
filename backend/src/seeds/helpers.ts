export const makeCode = (prefix: string, n: number, width = 4) => {
  return `${prefix}-${String(n).padStart(width, "0")}`;
};
