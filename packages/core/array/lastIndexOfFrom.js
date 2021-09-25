import { curry } from "../lambda/curry.js";

export const lastIndexOfFrom = curry((value, fromIndex, arr) =>
  arr.lastIndexOf(value, fromIndex)
);
