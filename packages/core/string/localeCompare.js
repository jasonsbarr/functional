import { curry } from "../lambda/curry.js";

export const localeCompare = curry((compare, str) =>
  str.localeCompare(compare)
);
