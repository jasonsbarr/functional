import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";

// curried version of slice
export const sliceC = curry((start, end, step, iter) =>
  slice(iter, start, end, step)
);
