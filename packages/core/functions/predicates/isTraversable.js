import { isFunction } from "./isFunction.js";

export const isTraversable = (obj) => isFunction(obj.traverse);
