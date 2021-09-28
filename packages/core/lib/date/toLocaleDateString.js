import { curry } from "../lambda/curry.js";

export const toLocaleDateString = curry((locales, date) =>
  date.toLocaleDateString(locales)
);
