import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { includes } from "./includes.js";
import { unique } from "./unique.js";

export const intersection = curry((iter1, iter2) => {
  let set1 = unique(iter1);
  let set2 = unique(iter2);
  let result = [];

  for (let item of set2) {
    if (includes(item, set1)) {
      result.push(item);
    }
  }

  return iter1.constructor(...result);
});
