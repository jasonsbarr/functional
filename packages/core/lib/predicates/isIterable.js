import { isNil } from "./isNil.js";
import { isFunction } from "./isFunction.js";

// stolen from https://stackoverflow.com/a/32538867
export const isIterable = (obj) =>
  !isNil(obj) && isFunction(obj[Symbol.iterator]);
