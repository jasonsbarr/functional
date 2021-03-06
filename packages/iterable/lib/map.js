import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";

export const map = curry((fn, iter) => {
  let temp = [];
  for (let item of iter) {
    temp.push(fn(item));
  }
  return iter.constructor(...temp);
});
