import { concatValues } from "../functions/helpers/concatValues.js";

class Identity {
  constructor(value) {
    this._value = value;

    Object.defineProperty(this, "_value", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: value,
    });

    Object.defineProperty(this, "type", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: "Id",
    });

    Object.defineProperty(this, "constructor", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Id,
    });
  }

  get value() {
    return this._value;
  }

  map(fn) {
    return Id(fn(this.value));
  }

  chain(fn) {
    return fn(this.value);
  }

  fold(fn) {
    return fn(this.value);
  }

  inspect() {
    return `Identity(${this.value})`;
  }

  concat(o) {
    return Id(concatValues(this.value, o.value));
  }

  ap(o) {
    return o.map(this.value);
  }

  toString() {
    return this.inspect();
  }
}

export const Id = (x) => new Identity(x);

Id.of = (x) => Id(x);
Id.isId = (obj) => obj.type === "Id";
