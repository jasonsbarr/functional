import { isNil } from "../utils/nil.js";
/*
 * type Option = Some(x: T) | None(null|undefined|NaN)
 */

export const Option = {
  of: (x) =>
    // check if null, undefined, or NaN
    isNil(x) || Number.isNaN(x) ? None(x) : Some(x),
  isSome: (obj) => obj.kind === "Some",
  isNone: (obj) => obj.kind === "None",
  isOption: (obj) => obj.kind === "Some" || obj.kind === "None",
};

class S {
  constructor(value) {
    this._value = value;

    Object.defineProperty(this, "_value", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: value,
    });

    Object.defineProperty(this, "kind", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: "Some",
    });

    Object.defineProperty(this, "constructor", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Some,
    });
  }

  get value() {
    return this._value;
  }

  map(f) {
    return Option.of(f(this.value));
  }

  chain(f) {
    return f(this.value);
  }

  fold(f, g) {
    return g(this.value);
  }

  inspect() {
    return `Some(${this.value})`;
  }

  isNone() {
    return false;
  }

  isSome() {
    return true;
  }

  concat(o) {
    return o.fold(
      (n) => None(n),
      (s) => Some(this.value.concat(s))
    );
  }

  ap(o) {
    return this.map(o.value);
  }

  toString() {
    return this.inspect();
  }
}

export const Some = (x) => new S(x);

class N {
  constructor(value) {
    this._value = value;

    Object.defineProperty(this, "_value", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: value,
    });

    Object.defineProperty(this, "kind", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: "None",
    });

    Object.defineProperty(this, "constructor", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: None,
    });
  }

  get value() {
    return this._value;
  }

  map(f) {
    return this;
  }

  chain(f) {
    return this;
  }

  fold(f, g) {
    return f(this.value);
  }

  inspect() {
    return "None";
  }

  isNone() {
    return true;
  }

  isSome() {
    return false;
  }

  concat(o) {
    return this;
  }

  ap(o) {
    return this;
  }

  toString() {
    return this.inspect();
  }
}

export const None = (x) => new N(x);
