import { isFunction } from "./isFunction.js";

export const isFunctor = (obj) => isFunction(obj.map);
