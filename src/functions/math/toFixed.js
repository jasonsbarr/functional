import { curry } from "../lambda/curry.js";

export const toFixed = curry((digits, num) =>
  Number.parseFloat(num).toFixed(digits)
);
