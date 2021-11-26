import { curry } from "./curry.js";
import { lt } from "./lt.js";
import { equals } from "./equals.js";

export const compare = curry((obj1, obj2) =>
  lt(obj1, obj2) ? -1 : equals(obj1, obj2) ? 0 : 1
);
