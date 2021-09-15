import { reduce } from "./iter";
import { isFunction } from "../lambda/isFunction";

export const allFuncs = (xs) => reduce((b, x) => b && isFunction(x), true, xs);
