import { isFunction } from "./isFunction.js";

export const isShow = (obj) =>
  isFunction(obj.toString) && obj.toString().slice(0, 7) !== "[object";
