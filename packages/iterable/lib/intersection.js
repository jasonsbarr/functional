import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";

export const intersection = curry((iter1, iter2) => {
  let set1 = new Set([...iter1]);
  let set2 = new Set([...iter2]);
  let result = [];
  for (let item of set2) {
    if (set1.has(item)) {
      result.push(item);
    }
  }
  return iter1.constructor(...result);
});
