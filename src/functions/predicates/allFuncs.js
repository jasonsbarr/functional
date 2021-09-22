import { reduce } from "../iterable/reduce.js";
import { isFunction } from "../predicates/isFunction.js";

export const allFuncs = (xs) => reduce((b, x) => b && isFunction(x), true, xs);
