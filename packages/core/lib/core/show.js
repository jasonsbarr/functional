import { isFunction } from "../predicates/isFunction.js";
import { string } from "../string/string.js";

export const show = (obj) =>
  obj && isFunction(obj.toString) ? obj.toString() : string(obj);
