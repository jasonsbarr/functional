import { curry } from "../lambda/curry.js";

export const fill = curry((value, start, end, arr) =>
  [...arr].fill(value, start, end)
);
