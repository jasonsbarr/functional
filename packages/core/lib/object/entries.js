import { isObject } from "../predicates/isObject.js";

export const entries = (obj) =>
  isObject(obj) ? Object.entries(obj) : obj.entries();
