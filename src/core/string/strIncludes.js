import { curry } from "../lambda/curry.js";

export const strIncludes = curry((search, start, str) =>
  str.includes(search, start)
);
