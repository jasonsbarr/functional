import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";

export const each = curry((fn, iter) => {
  for (let item of iter) {
    fn(item);
  }
});
