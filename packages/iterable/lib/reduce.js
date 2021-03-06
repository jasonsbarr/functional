import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";

export const reduce = curry((fn, initial, iter) => {
  let acc = initial;
  for (let item of iter) {
    acc = fn(acc, item);
  }
  return acc;
});
