import { curry } from "../lambda/curry.js";

export const replaceAll = curry((search, replace, str) =>
  str.replaceAll(search, replace)
);
