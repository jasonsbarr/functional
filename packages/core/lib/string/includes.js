import { curry } from "../lambda/curry.js";

export const includes = curry((search, start, str) =>
  str.includes(search, start)
);
