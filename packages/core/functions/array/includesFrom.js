import { curry } from "../lambda/curry.js";

export const includesFrom = curry((value, fromIndex, arr) =>
  arr.includes(value, fromIndex)
);
