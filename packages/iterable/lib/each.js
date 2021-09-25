import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";

export const each = curry((fn, iter) => {
  for (let item of iter) {
    fn(item);
  }
});
