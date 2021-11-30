import { isFunction } from "./isFunction.js";

export const isAsyncIterable = (obj) => isFunction(obj[Symbol.asyncIterator]);
