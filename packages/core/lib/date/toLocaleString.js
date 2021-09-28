import { curry } from "../lambda/curry.js";

export const toLocaleString = curry((locales, date) =>
  date.toLocaleString(locales)
);
