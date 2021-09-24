import { curry } from "../lambda/curry.js";

export const lastIndexOf = curry((searchValue, fromIndex, str) =>
  str.strLastIndexOf(searchValue, fromIndex)
);
