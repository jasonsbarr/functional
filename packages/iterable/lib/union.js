import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";

export const union = curry((iter1, iter2) => {
  let set1 = new Set([...iter1]);
  let set2 = new Set([...iter2]);
  for (let item of set2) {
    set1.add(item);
  }
  return iter1.constructor(...set1);
});
