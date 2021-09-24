import { handleNegativeIndex } from "../helpers/handleNegativeIndex.js";
import { curry } from "../lambda/curry.js";

export const codePointAt = curry((index, str) =>
  str.codePointAt(handleNegativeIndex(index, str))
);
