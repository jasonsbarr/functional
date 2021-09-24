import { curry } from "../lambda/curry.js";
import { equals } from "../object/equals.js";

export const remove = curry((search, iter) => {
  let result = [];
  for (let item of iter) {
    if (typeof search === "function") {
      if (!search(item)) result.push(item);
    } else if (search instanceof RegExp) {
      if (!search.test(item)) result.push(item);
    } else {
      if (!equals(search, item)) result.push(item);
    }
  }
  return iter.constructor(...result);
});
