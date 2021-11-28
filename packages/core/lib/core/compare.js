import { curry } from "./curry.js";
import { isFunction } from "../predicates/isFunction.js";
import { lt } from "./lt.js";
import { equals } from "./equals.js";

export const compare = curry((obj1, obj2) =>
  isFunction(obj1.compare)
    ? // compare method should return a positive number, 0, or a negative number based on the comparison
      obj1.compare(obj2)
    : lt(obj1, obj2)
    ? -1
    : equals(obj1, obj2)
    ? 0
    : 1
);
