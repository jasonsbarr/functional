import { curry } from "./curry.js";
import { failure } from "./failure.js";
import { isFunction } from "../predicates/isFunction.js";

export const ap = (ap1, ap2) =>
  isFunction(ap1.ap)
    ? ap1.ap(ap2)
    : failure("Applicative must have an ap method");
