import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";

export const mapWithIndex = curry((fn, iter) => {
  let temp = [];
  let i = 0;
  for (let item of iter) {
    temp.push(fn(item, i));
    i++;
  }
  return iter.constructor(...temp);
});
