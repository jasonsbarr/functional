import { isObject } from "./isObject.js";

export const hasConstructor = (obj) =>
  isObject(obj) && obj.constructor && obj.constructor.name !== "Object";
