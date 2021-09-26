import { curry } from "../lambda/curry.js";
import { boolean } from "../type/boolean.js";

export const assert = curry((expr, errorMsg) => {
  if (boolean(expr)) {
    return true;
  }
  throw new Error(errorMsg);
});
