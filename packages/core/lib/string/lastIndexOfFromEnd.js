import { curry } from "../lambda/curry.js";
import { length } from "./length.js";
import { lastIndexOf } from "../iterable/lib/lastIndexOf.js";

export const lastIndexOfFromEnd = curry((search, str) =>
  lastIndexOf(search, length(str) - 1, str)
);
