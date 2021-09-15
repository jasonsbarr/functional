import { _curry1 } from "./internal/_curry1.js";
import { curryN } from "./curryN.js";
// curry functions and their dependencies stolen from Ramda
export const curry = _curry1(function curry(fn) {
  return curryN(fn.length, fn);
});
