import { curry } from "../lambda/curry.js";

export const startsWith = curry((search, startIndex, str) =>
  str.startsWith(search, startIndex)
);
