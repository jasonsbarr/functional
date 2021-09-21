import { curry } from "../lambda/curry.js";
import { strLastIndexOf } from "./strLastIndexOf.js";
import { strLen } from "./strLen.js";

export const strLastIndexOfFromEnd = curry((search, str) =>
  strLastIndexOf(search, strLen(str) - 1, str)
);
