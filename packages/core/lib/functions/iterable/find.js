import { curry } from "../lambda/curry.js";
import { equals } from "../object/equals.js";
import { Some, None } from "../../types/Option.js";

// returns Option
export const find = curry((pred, iter) => {
  for (let item of iter) {
    if (typeof pred === "function") {
      if (pred(item)) return Some(item);
    } else if (pred instanceof RegExp) {
      if (pred.test(item)) return Some(item);
    } else {
      if (equals(pred, item)) return Some(item);
    }
  }
  return None(null);
});
