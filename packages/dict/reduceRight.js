import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { entries } from "@jasonsbarr/functional-core/object/entries.js";

export const reduceRight = curry((fn, initial, dict) => {
  let acc = initial;
  for (let [k, v] of entries(dict).reverse()) {
    acc = fn(acc, v, k);
  }
  return acc;
});
