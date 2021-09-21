import { curry } from "../lambda/curry.js";
import { strIncludes } from "./strIncludes.js";

export const strIncludesFromStart = curry((search, str) =>
  strIncludes(search, 0, str)
);
