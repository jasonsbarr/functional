import { curry } from "../lambda/curry.js";

export const replace = curry((search, replacement, str) =>
  str.replace(search, replacement)
);
