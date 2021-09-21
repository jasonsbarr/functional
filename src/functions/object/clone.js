export const clone = (obj) => {
  let result = Array.isArray(obj)
    ? []
    : obj instanceof Map
    ? new Map()
    : obj instanceof Set
    ? new Set()
    : Object.create(null);
  if (obj instanceof Map) {
    for (let [key, _] of obj.entries()) {
      result.set(key, clone(obj.get(key)));
    }
  } else if (obj instanceof Set) {
    for (let value of obj.values()) {
      result.add(clone(value));
    }
  } else if (Array.isArray(obj)) {
    for (let [key, value] of obj.entries()) {
      result[key] = clone(value);
    }
  } else if (obj instanceof Date) {
    result = new Date(obj.getTime());
  } else if (obj instanceof RegExp) {
    result = new RegExp(obj.source, getRegExpFlags(obj));
  } else if (typeof obj === "object" && obj !== null) {
    // is actual object, not null
    for (let key of Object.getOwnPropertyNames(obj)) {
      result[key] = getValue(key, obj);
    }
    for (let key of Object.getOwnPropertySymbols(obj)) {
      result[key] = getValue(key, obj);
    }
    // set proto because I used Object.create(null) above
    Object.setPrototypeOf(result, obj.__proto__);
  } else {
    // obj is a primitive value or function
    result = obj;
  }
  return result;
};

const getValue = (key, obj) => {
  let value = obj[key];
  let result;

  if (value instanceof Map) {
    result = cloneMap(value);
  }
  if (value instanceof Set) {
    result = cloneSet(value);
  }
  if (Array.isArray(value)) {
    result = [];
    for (let v of value) {
      result.push(clone(v));
    }
  } else if (value instanceof Date) {
    result = new Date(value.getTime());
  } else if (value instanceof RegExp) {
    result = RegExp(value.source, getRegExpFlags(value));
  } else if (typeof value === "object") {
    result = clone(value);
  } else {
    // is primitive or function
    result = value;
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
