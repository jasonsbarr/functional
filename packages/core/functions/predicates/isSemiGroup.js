import { isFunction } from "./isFunction.js";

export const isSemiGroup = (obj) => isFunction(obj.concat);
