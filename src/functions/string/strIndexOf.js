import { curry } from "../lambda/curry.js";

export const strIndexOf = curry((search, startIndex, str) =>
  str.indexOf(search, startIndex)
);
