import { curry } from "../lambda/curry.js";

export const indexOfFrom = curry((value, fromIndex, arr) =>
  arr.indexOf(value, fromIndex)
);
