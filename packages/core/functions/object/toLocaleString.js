import { curry } from "../lambda/curry.js";

export const toLocaleString = curry((locales, obj) =>
  obj.toLocaleString(locales)
);
