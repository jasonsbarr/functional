import { curry } from "../lambda/curry.js";

export const copyWithin = curry((target, start, end, arr) =>
  [...arr].copyWithin(target, start, end)
);
