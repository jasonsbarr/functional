import { handleNegativeIndex } from "../helpers/handleNegativeIndex.js";
import { curry } from "../lambda/curry.js";

export const charCodeAt = curry((index, str) =>
  str.charCodeAt(handleNegativeIndex(index, str))
);
