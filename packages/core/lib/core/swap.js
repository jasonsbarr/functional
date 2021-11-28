import { isFunction } from "../predicates/isFunction.js";
import { curry } from "./curry.js";
import { failure } from "./failure.js";

export const swap = curry((leftF, rightF, obj) =>
  isFunction(obj.swap)
    ? obj.swap(leftF, rightF)
    : failure("Swap type class must implement swap method")
);
