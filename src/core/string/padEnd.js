import { curry } from "../lambda/curry.js";

export const padEnd = curry((targetLength, padString, str) =>
  str.padEnd(targetLength, padString)
);
