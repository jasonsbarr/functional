import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { entries } from "@jasonsbarr/functional-core/object/entries.js";
import { equals } from "@jasonsbarr/functional-core/object/equals.js";
import { isFunction } from "@jasonsbarr/functional-core/predicates/isFunction.js";
import { isRegExp } from "@jasonsbarr/functional-core/predicates/isRegExp.js";

export const count = curry((search, dict) => {
  let count = 0;
  for (let [k, v] of entries(dict)) {
    if (isFunction(search)) {
      count += search(v) ? 1 : 0;
    } else if (isRegExp(search)) {
      count += search.test(v) ? 1 : 0;
    } else {
      count += equals(v, search) ? 1 : 0;
    }
  }
  return count;
});
