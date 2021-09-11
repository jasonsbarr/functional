import { Option } from "../monads/Option.js";

const recordProto = {
  get(key) {
    return Option.of(this[key]);
  },

  set(key, value) {
    return this.constructor.of({ ...this, [key]: value });
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

export const record = (object) => {
  const keys = Object.keys(object);
  const constructor = Record(...keys);
  return constructor.of(object);
};
