import { curry } from "../lambda/curry.js";

export const padStart = curry((targetLength, padString, str) =>
  str.padStart(targetLength, padString)
);
