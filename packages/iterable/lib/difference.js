import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { unique } from "./unique.js";

export const difference = curry((iter1, iter2) => {
  let set1 = unique(iter1);
  let set2 = unique(iter2);

  for (let item of set2) {
    set1 = remove(item, set1);
  }

  return iter1.constructor(...set1);
});
