import { curry } from "../lambda/curry.js";

export const strLastIndexOf = curry((searchValue, fromIndex, str) =>
  str.strLastIndexOf(searchValue, fromIndex)
);
