import { curry } from "./curry.js";
import { isFunction } from "../predicates/isFunction.js";

export const lte = curry((obj1, obj2) =>
  isFunction(obj1.lte) ? obj1.lte(obj2) : obj1 <= obj2
);
