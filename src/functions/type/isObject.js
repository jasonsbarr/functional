import { isNil } from "./isNil.js";

export const isObject = (obj) =>
  !isNil(obj) &&
  typeof obj === "object" &&
  obj instanceof Map === false &&
  obj instanceof Set === false &&
  obj instanceof RegExp === false &&
  obj instanceof Date === false &&
  !Array.isArray(obj);
