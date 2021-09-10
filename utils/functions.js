import { tryCatch } from "../types/functors/Result";
import { isIterable } from "./iter";

export const identity = (x) => x;

export const noop = () => {};

// stolen from https://github.com/adobe/ferrum/blob/6434098c7f8ca6cb31a6bbe54dff3d1026a25f2d/src/functional.js#L109
export const pipeline = (val, ...fns) => fns.reduce((v, fn) => fn(v), val);

// stolen from https://github.com/adobe/ferrum/blob/6434098c7f8ca6cb31a6bbe54dff3d1026a25f2d/src/functional.js#L129
export const pipe =
  (...fns) =>
  (val) =>
    pipeline(val, ...fns);

export const thunk = (fn) => {
  let value;
  let computed = false;

  return () => {
    if (computed) {
      return value;
    }
    computed = true;
    value = fn();
    return value;
  };
};

export const defer =
  typeof setImmediate !== "undefined"
    ? (f) => setImmediate(f)
    : typeof process !== "undefined"
    ? (f) => process.nextTick(f)
    : (f) => setTimeout(f, 0);

// Returns a single array of the function args based on whether the first arg is an iterable object
export const getArrayFromArgs = (...args) =>
  isIterable(args[0]) && typeof args[0] !== "string" ? [...args[0]] : args;

// returns true if all arguments or all elements in a single iterable argument are true
export const all = (...args) =>
  tryCatch(() =>
    getArrayFromArgs(args).reduce((acc, x) => acc && x, true)
  ).fold(() => false, identity);

// returns true if any argument or an element in a single iterable argument is true
export const any = (...args) =>
  tryCatch(() =>
    getArrayFromArgs(args).reduce((acc, x) => acc || x, false)
  ).fold(() => false, identity);

export const sum = (...args) =>
  getArrayFromArgs(args).reduce((acc, x) => acc + x, 0);

export const product = (...args) =>
  getArrayFromArgs(args).reduce((acc, x) => acc * x, 1);
