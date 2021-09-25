import { curry } from "../lambda/curry.js";
import { entries } from "../object/entries.js";
import { equals } from "../object/equals.js";
import { isFunction } from "../predicates/isFunction.js";
import { isRegExp } from "../predicates/isRegExp.js";

export const none = curry((search, dict) => {
  for (let [_, v] of entries(dict)) {
    if (isFunction(search)) {
      if (search(v)) return false;
    } else if (isRegExp(search)) {
      if (search.test(v)) return false;
    } else {
      if (equals(search, v)) return false;
    }
  }
  return true;
});
