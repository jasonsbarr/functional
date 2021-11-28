import { curry } from "./curry.js";
import { isFunction } from "../predicates/isFunction.js";
import { failure } from "./failure.js";

export const chain = curry((fn, obj) =>
  isFunction(obj.chain)
    ? obj.chain(fn)
    : failure("Value for Chain type class must have chain method")
);
