import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { equals } from "@jasonsbarr/functional-core/lib/object/equals.js";
import { Some, None } from "@jasonsbarr/functional-core/lib/types/Option.js";

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
