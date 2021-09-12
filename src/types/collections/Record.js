import { hash } from "../../utils/object.js";
import { equals } from "../../utils/equals.js";
import { Option } from "../monads/Option.js";

const recordProto = {
  // returns a Record with the same keys but all values set to undefined
  clear() {
    let copy = this.toObject();
    for (let key in Object.keys(copy)) {
      copy[key] = undefined;
    }
    return this.constructor.of(copy);
  },

  copy() {
    return this.constructor.of({ ...this });
  },

  delete(key) {
    let copy = this.toObject();
    if (key in copy) {
      copy[key] = undefined;
    }
    return this.constructor.of(copy);
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
    return Object.keys(this).includes(key);
  },

  hash() {
    return hash(this);
  },

  hashEquals(other) {
    return hash(this) === hash(other);
  },

  hasValue(value) {
    for (let key in Object.keys(this)) {
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

  // overwrites properties from right to left,
  // so last object with a certain key will have its value assigned to the new Record
  // will merge any object, not just a Record, but returns a Record
  merge(...others) {
    return record(Object.assign(this, ...others));
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

  toString() {
    return JSON.stringify(this.toObject(), null, 2);
  }

  // takes function to update value, function takes Option.of(currentValue) so must unpack the Option
  // unknown keys will not be assigned to the new Record
  update(key, updater) {
    const value = this.get(key);
    return this.constructor.of({ ...this, [key]: updater(value) });
  },
};

Object.setPrototypeOf(recordProto, null);

// Note that values must be passed in the same order as the keys are defined,
// and only the keys specified to the constructor constructor will get values
// Keys can be either strings or symbols
export const Record = (...keys) => {
  const constructor = (...values) => {
    let record = Object.create(recordProto);

    for (let i = 0; i < keys.length; i++) {
      record[keys[i]] = values[i];
    }

    Object.defineProperty(record, "constructor", {
      configurable: false,
      enumerable: false,
      writable: true,
      value: constructor,
    });

    Object.freeze(record);
    return record;
  };

  constructor.of = (object) => {
    let record = Object.create(recordProto);

    for (let key of keys) {
      record[key] = undefined;
    }

    // unspecified keys will have their values discarded
    for (let key of Object.keys(object)) {
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

    Object.freeze(record);
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
