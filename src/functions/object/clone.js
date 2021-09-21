import { isMap } from "../predicates/isMap.js";
import { isSet } from "../predicates/isSet.js";
import { names } from "./names.js";
import { symbols } from "./symbols.js";
import { isArray } from "../predicates/isArray.js";
import { isDate } from "../predicates/isDate.js";
import { isRegExp } from "../predicates/isRegExp.js";
import { isObject } from "../predicates/isObject.js";
import { copyProto } from "./copyProto.js";

// clone copies all own properties, symbol and string, recursively then sets the target prototype to that of the source
// may not work with Object versions of primitives
export const clone = (obj) => {
  let result = isArray(obj)
    ? []
    : isMap(obj)
    ? new Map()
    : isSet(obj)
    ? new Set()
    : isDate(obj)
    ? new Date(obj.getTime())
    : isRegExp(obj)
    ? new RegExp(obj.source, getRegExpFlags(obj))
    : isObject(obj)
    ? Object.create(null)
    : // is primitive
      obj;
  if (isMap(obj)) {
    for (let [key, _] of obj.entries()) {
      result.set(key, clone(obj.get(key)));
    }
  } else if (isSet(obj)) {
    for (let value of obj.values()) {
      result.add(clone(value));
    }
  } else if (isArray(obj)) {
    result = cloneArray(obj);
  } else if (isDate(obj)) {
    result = new Date(obj.getTime());
  } else if (isRegExp(obj)) {
    result = new RegExp(obj.source, getRegExpFlags(obj));
  } else if (isObject(obj)) {
    // is actual object, not null
    for (let key of names(obj)) {
      result[key] = getValue(key, obj);
    }
    for (let key of symbols(obj)) {
      result[key] = getValue(key, obj);
    }
    // set proto because I used Object.create(null) above
    copyProto(obj, result);
  } else {
    // obj is a primitive value or function
    result = obj;
  }
  return result;
};

const getValue = (key, obj) => {
  let value = obj[key];
  let result;

  if (isMap(value)) {
    result = cloneMap(value);
  }
  if (isSet(value)) {
    result = cloneSet(value);
  }
  if (isArray(value)) {
    result = cloneArray(value);
  } else if (isDate(value)) {
    result = new Date(value.getTime());
  } else if (isRegExp(value)) {
    result = RegExp(value.source, getRegExpFlags(value));
  } else if (isObject(value)) {
    result = clone(value);
  } else {
    // is primitive or function
    result = value;
  }
  return result;
};

const cloneArray = (arr) => {
  let result = [];
  for (let value of obj) {
    result.push(clone(value));
  }
  return result;
};

const cloneMap = (map) => {
  let result = new Map();
  for (let [key, _] of map.entries()) {
    result.set(key, clone(map.get(key)));
  }
  return result;
};

const cloneSet = (set) => {
  let result = new Set();
  for (let value of set.values()) {
    result.add(clone(value));
  }
  return result;
};

// stolen from https://github.com/angus-c/just/blob/master/packages/collection-clone/index.js
const getRegExpFlags = (regExp) => {
  if (typeof regExp.source.flags == "string") {
    return regExp.source.flags;
  } else {
    var flags = [];
    regExp.global && flags.push("g");
    regExp.ignoreCase && flags.push("i");
    regExp.multiline && flags.push("m");
    regExp.sticky && flags.push("y");
    regExp.unicode && flags.push("u");
    return flags.join("");
  }
};
