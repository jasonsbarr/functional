import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { unique } from "./unique.js";

export const union = curry((iter1, iter2) => {
  let temp = [...unique(iter1)];

  for (let item of unique(iter2)) {
    temp.push(item);
  }

  return iter1.constructor(...temp);
});
