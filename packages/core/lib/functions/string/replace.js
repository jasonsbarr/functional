import { curry } from "../lambda/curry.js";

export const replace = curry((search, replace, str) =>
  str.replace(search, replace)
);
