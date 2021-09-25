import { isFunction } from "./isFunction.js";

export const allFuncs = (xs) => xs.reduce((b, x) => b && isFunction(x), true);
