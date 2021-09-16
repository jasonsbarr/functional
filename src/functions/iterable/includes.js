import { curry } from "../lambda/curry.js";
import { equals } from "../object/equals.js";

// works with any value, including objects
export const includes = curry((value, iter) => {
  for (let item of iter) {
    if (equals(item, value)) {
      return true;
    }
  }
  return false;
});
