import { curry } from "./curry.js";
import { isFunction } from "../predicates/isFunction.js";
import { failure } from "./failure.js";

export const reduce = curry((fn, foldable) =>
  isFunction(foldable.reduce)
    ? foldable.reduce(fn)
    : failure("Foldable must have a reduce method")
);
