import { curry } from "./curry.js";
import { isFunction } from "../predicates/isFunction.js";
import { failure } from "./failure.js";

export const sequence = curry((point, obj) =>
  isFunction(obj.sequence)
    ? obj.sequence(point)
    : failure("Traversable value must implement sequence method")
);
