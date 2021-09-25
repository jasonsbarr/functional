import { isArray } from "./isArray.js";
import { isDate } from "./isDate.js";
import { isMap } from "./isMap.js";
import { isNil } from "./isNil.js";
import { isRegExp } from "./isRegExp.js";
import { isSet } from "./isSet.js";

export const isObject = (obj) =>
  !isNil(obj) &&
  typeof obj === "object" &&
  !isMap(obj) &&
  !isSet(obj) &&
  !isRegExp(obj) &&
  !isDate(obj) &&
  !isArray(obj);
