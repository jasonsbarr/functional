import { isFunction } from "../predicates/isFunction.js";
import { failure } from "./failure.js";
import { curry } from "./curry.js";

export const map = curry((fn, functor) =>
  isFunction(functor.map)
    ? functor.map(fn)
    : failure("A functor must have a map method")
);
