import { hash } from "../functions/object/hash.js";
import { equals } from "../functions/object/equals.js";
import { Option } from "./Option.js";
import { extend } from "../functions/object/extend.js";
import { entries } from "../functions/iterable/entries.js";
import { keys } from "../functions/object/keys.js";
import { values } from "../functions/object/values.js";
import { clone } from "../functions/object/clone.js";
import { freeze } from "../functions/object/freeze.js";
import { includes } from "../functions/iterable/includes.js";
import { create } from "../functions/object/create.js";
import { toQueryString } from "../functions/dict/toQueryString.js";

const recordProto = {
  // returns a Record with the same keys but all values set to undefined
  clear() {
    let copy = this.toObject();
    for (let key in keys(copy)) {
      copy[key] = undefined;
    }
    return this.constructor.of(copy);
  },

  // clones all properties, including objects
  clone() {
    return this.constructor.of(clone(this));
  },

  // shallow copy
  copy() {
    return this.constructor.of(this);
  },

  delete(key) {
    let copy = this.toObject();
    if (key in copy) {
      copy[key] = undefined;
    }
    return this.constructor.of(copy);
  },

  entries() {
    return entries(this);
  },

  // checks for deep equality
  equals(other) {
    return equals(this, other);
  },

  get(key) {
    return Option.of(this[key]);
  },

  getWithDefault(key, defaultValue) {
    return this[key] ?? defaultValue;
  },

  has(key) {
    return includes(key, keys(this));
  },

  hash() {
    return hash(this);
  },

  // may be faster than the deep equals algorithm used by this.equals
  hashEquals(other) {
    return hash(this) === hash(other);
  },

  index(value) {
    for (let key in keys(this)) {
      if (equals(this[key], value)) {
        return true;
      }
    }
    return false;
  },

  inspect() {
    return this.toString();
  },

  isRecord() {
    return true;
  },

  keys() {
    return keys(this);
  },

  // overwrites properties from right to left,
  // so last object with a certain key will have its value assigned to the new Record
  // will merge any object, not just a Record, but returns a Record
  merge(...others) {
    return record(extend({}, this, ...others));
  },

  set(key, value) {
    return this.constructor.of({ ...this, [key]: value });
  },

  toJSON() {
    return JSON.stringify(this.toObject());
  },

  toObject() {
    return { ...this };
  },

  toQueryString() {
    return toQueryString(this);
  },

  toString() {
    return JSON.stringify(this.toObject(), null, 2);
  },

  // takes function to update value, function takes Option.of(currentValue) so must unpack the Option
  // unknown keys will not be assigned to the new Record
  update(key, updater) {
    const value = this.get(key);
    return this.constructor.of({ ...this, [key]: updater(value) });
  },

  values() {
    return values(this);
  },

  valueOf() {
    return this.toObject();
  },
};

Object.setPrototypeOf(recordProto, null);

// Note that values must be passed in the same order as the keys are defined,
// and only the keys specified to the constructor constructor will get values
// Keys can be either strings or symbols
export const Record = (...recKeys) => {
  const constructor = (...values) => {
    let record = create(recordProto);

    for (let i = 0; i < recKeys.length; i++) {
      record[recKeys[i]] = values[i];
    }

    Object.defineProperty(record, "constructor", {
      configurable: false,
      enumerable: false,
      writable: true,
      value: constructor,
    });

    freeze(record);
    return record;
  };

  constructor.of = (object) => {
    let record = Object.create(recordProto);

    for (let key of recKeys) {
      record[key] = undefined;
    }

    // unspecified keys will have their values discarded
    for (let key of keys(object)) {
      if (key in record) {
        record[key] = object[key];
      }
    }

    Object.defineProperty(record, "constructor", {
      configurable: false,
      enumerable: false,
      writable: true,
      value: constructor,
    });

    freeze(record);
    return record;
  };

  return constructor;
};

Record.isRecord = (obj) =>
  typeof obj.isRecord === "function" && obj.isRecord() === true;

// create ad-hoc records
export const record = (object) => {
  const keys = Object.keys(object);
  const constructor = Record(...keys);
  return constructor.of(object);
};
