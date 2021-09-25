import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";

export const reduceRight = curry((fn, initial, iter) => {
  const temp = [...iter];
  return iter.constructor(...temp.reduceRight(fn, initial));
});
