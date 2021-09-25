import { isFunction } from "./isFunction.js";

export const isFoldable = (obj) =>
  isFunction(obj.fold) || isFunction(obj.reduce);
