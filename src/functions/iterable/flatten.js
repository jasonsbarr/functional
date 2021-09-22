import { each } from "./each.js";
import { isIterable } from "./isIterable.js";
import { concatToArray } from "./concatToArray.js";
import { isString } from "../predicates/isString.js";

// flattens completely or to specified level of depth
export const flatten = (iter, level = Infinity, current = 0) => {
  let result = [];
  each((item) => {
    if (isIterable(item) && !isString && current < level) {
      result = concatToArray(result, flatten(item, level, current + 1));
    } else {
      result.push(item);
    }
  }, iter);
  return iter.constructor(...result);
};
