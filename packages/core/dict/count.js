import { curry } from "../lambda/curry.js";
import { entries } from "../object/entries.js";
import { equals } from "../object/equals.js";
import { isFunction } from "../predicates/isFunction.js";
import { isRegExp } from "../predicates/isRegExp.js";

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
