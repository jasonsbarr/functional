import { isFunction } from "./isFunction.js";
import { isString } from "../predicates/isString.js";
import { isArray } from "../predicates/isArray.js";

export const isSemiGroup = (obj) =>
  isFunction(obj.concat) || isString(obj) || isArray(obj);
