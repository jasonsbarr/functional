import { equal } from "../../utils/equal.js";
import { Option } from "../monads/Option.js";

const recordProto = {
  isRecord() {
    return true;
  },

  // checks for deep equality
  equals(other) {
    return equal(this, other);
  },

  get(key) {
    return Option.of(this[key]);
  },

  has(key) {
    return Object.keys(this).includes(key);
  },

  hasValue(value) {
    for (let key in Object.keys(this)) {
      if (equal(this[key], value)) {
        return true;
      }
    }
    return false;
  },

  set(key, value) {
    return this.constructor.of({ ...this, [key]: value });
  },

  toObject() {
    return { ...this };
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
