import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { equals } from "@jasonsbarr/functional-core/object/equals.js";

export const all = curry((search, iter) => {
  for (let item of iter) {
    if (typeof search === "function") {
      if (!search(item)) return false;
    } else if (search instanceof RegExp) {
      if (!search.test(item)) return false;
    } else {
      if (!equals(search, item)) return false;
    }
  }
  return true;
});
