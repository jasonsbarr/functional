import { isFunction } from "./isFunction.js";

export const isBifunctor = (obj) => isFunction(obj.bimap);
