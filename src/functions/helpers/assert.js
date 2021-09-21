import { boolean } from "../type/boolean.js";

export const assert = (expr) => {
  if (boolean(expr)) {
    return true;
  }
  throw new Error("Expected true expression, got false");
};
