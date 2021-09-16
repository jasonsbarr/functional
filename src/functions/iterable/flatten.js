import { each } from "./each.js";
import { isIterable } from "./isIterable.js";
import { concatToArray } from "./concatToArray.js";

// flattens completely or to specified level of depth
export const flatten = (iter, level = Infinity, current = 0) => {
  // iter.constructor(concatToArray(...iter));
  let result = [];
  each((item) => {
    if (isIterable(item) && typeof item !== "string" && current < level) {
      result = concatToArray(result, flatten(item, level, current + 1));
    } else {
      result.push(item);
    }
  }, iter);
  return iter.constructor(...result);
};
