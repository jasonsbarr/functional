import { curry } from "../lambda/curry.js";

export const toLocaleUpperCase = curry((locale, str) =>
  str.toLocaleUpperCase(locale)
);
