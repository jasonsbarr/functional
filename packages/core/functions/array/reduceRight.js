import { curry } from "../lambda/curry.js";

export const reduceRight = curry((fn, initial, arr) =>
  arr.reduceRight(fn, initial)
);
