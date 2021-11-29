import { isFunction } from "./isFunction.js";

export const isFoldable = (obj) => isFunction(obj.reduce);
