import { handleNegativeIndex } from "../helpers/handleNegativeIndex.js";
import { curry } from "../lambda/curry.js";

export const charAt = curry((index, str) =>
  str.charAt(handleNegativeIndex(index, str))
);
