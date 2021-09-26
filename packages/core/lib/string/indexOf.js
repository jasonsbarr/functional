import { curry } from "../lambda/curry.js";

export const indexOf = curry((search, startIndex, str) =>
  str.indexOf(search, startIndex)
);
