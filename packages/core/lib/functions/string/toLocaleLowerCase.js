import { curry } from "../lambda/curry.js";

export const toLocaleLowerCase = curry((locale, str) =>
  str.toLocaleLowerCase(locale)
);
