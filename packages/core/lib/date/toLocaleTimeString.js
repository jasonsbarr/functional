import { curry } from "../lambda/curry.js";

export const toLocaleTimeString = curry((locales, date) =>
  date.toLocaleTimeString(locales)
);
