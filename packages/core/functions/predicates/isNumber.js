export const isNumber = (obj) =>
  typeof obj === "number" || (obj instanceof Number && !Number.isNaN(obj));
