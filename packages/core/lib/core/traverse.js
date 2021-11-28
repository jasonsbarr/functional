import { curry } from "./curry.js";
import { isFunction } from "../predicates/isFunction.js";
import { failure } from "./failure.js";

export const traverse = curry((point, fn, obj) =>
  isFunction(obj.traverse)
    ? obj.traverse(point, fn)
    : failure("Traversable value must implement traverse method")
);
