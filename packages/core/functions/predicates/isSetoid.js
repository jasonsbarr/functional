import { isFunction } from "./isFunction.js";

export const isSetoid = (obj) => isFunction(obj.equals);
