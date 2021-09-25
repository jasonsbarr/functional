import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { equals } from "@jasonsbarr/functional-core/lib/object/equals.js";

export const any = curry((search, iter) => {
  for (let item of iter) {
    if (typeof search === "function") {
      if (search(item)) return true;
    } else if (search instanceof RegExp) {
      if (search.test(item)) return true;
    } else {
      if (equals(search, item)) return true;
    }
  }
  return false;
});
