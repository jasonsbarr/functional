import { curry } from "../lambda/curry.js";
import { equals } from "../object/equals.js";
import { Some, None } from "../../types/Option.js";

// returns Option
export const findIndex = curry((pred, iter) => {
  let i = 0;
  for (let item of iter) {
    if (typeof pred === "function") {
      if (pred(item)) return Some(i);
    } else if (pred instanceof RegExp) {
      if (pred.test(item)) return Some(i);
    } else {
      if (equals(pred, item)) return Some(i);
    }
    i++;
  }
  return None(null);
});
