import { isFunction } from "../predicates/isFunction.js";
import { failure } from "./failure.js";

export const zero = (plus) =>
  isFunction(plus.zero)
    ? plus.zero()
    : failure("Item of Plus typeclass must have zero method");
