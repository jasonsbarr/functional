import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { length } from "./length.js";
import { allFuncs } from "@jasonsbarr/functional-core/lib/predicates/isAllFuncs.js";
import { map } from "./map.js";
import { concat } from "./concat.js";

// other is an iterable full of functions
export const ap = curry((other, iter) => {
  if (!length(other) || !allFuncs(other)) {
    throw new TypeError("First iterable must be all functions");
  }
  let results = [];
  for (let func of other) {
    results = iter.constructor(...concat(map(func, iter), results));
  }
  return results;
});
