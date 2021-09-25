import { _arity } from "./internal/_arity.js";
import { _curry1 } from "./internal/_curry1.js";
import { _curry2 } from "./internal/_curry2.js";
import { _curryN } from "./internal/_curryN.js";
// curry functions and their dependencies stolen from Ramda
export const curryN = _curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});
