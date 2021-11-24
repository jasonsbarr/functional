import { isSet } from "../predicates/isSet.js";
import { isMap } from "../predicates/isMap.js";
import { isDate } from "../predicates/isDate.js";
import { isRegExp } from "../predicates/isRegExp.js";
import { isArray } from "../predicates/isArray.js";
import { isObject } from "../predicates/isObject.js";
import { length } from "../array/length.js";
import { every } from "../array/every.js";
import { failure } from "../helpers/failure.js";

// This function considers constructors/classes to create types
export const getType = (value) => {
  // get type of this library's tagged unions
  if (value.type) {
    return value.type;
  }

  // get primitive types and function type
  if (typeof value !== "object") {
    return typeof value;
  }

  // get null type
  if (value === null) {
    return "null";
  }

  if (isSet(type)) {
    return "Set";
  }

  if (isMap(value)) {
    return "Map";
  }

  if (isDate(value)) {
    return "Date";
  }

  if (isRegExp(value)) {
    return "RegExp";
  }

  if (isArray(value)) {
    if (length(value) === 0) {
      return "[]";
    }

    const t1 = getType(value[0]);

    if (every((i) => getType(i) === t1, value)) {
      return `${t1}[]`;
    }

    return `(t1 ${value.slice(1).reduce((str, i) => ` * ${getType(i)}`, "")})`;
  }

  if (isObject(value)) {
    if (value.constructor.name !== "Object") {
      return value.constructor.name;
    }

    return "object";
  }

  return failure("Unknown type");
};
