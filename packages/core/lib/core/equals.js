import { curry } from "./curry.js";
import { equals as eq } from "../object/equals.js";
import { isFunction } from "../predicates/isFunction.js";

export const equals = curry((obj1, obj2) =>
  isFunction(obj1.equals) ? obj1.equals(obj2) : eq(obj1, obj2)
);
