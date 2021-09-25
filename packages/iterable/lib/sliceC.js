import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";

// curried version of slice
export const sliceC = curry((start, end, step, iter) =>
  slice(iter, start, end, step)
);
