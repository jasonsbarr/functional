import { concatValues } from "../functions/helpers/concatValues.js";
import { isNullish } from "../functions/predicates/isNullish.js";
import { ifElse } from "../functions/helpers/ifElse.js";
/*
 * type Option = Some(x: T) | None(null|undefined|NaN)
 */

export const Option = {
  of: (x) =>
    // check if null, undefined, or NaN
    isNullish(x) ? None(x) : Some(x),
  isSome: (obj) => obj.kind === "Some",
  isNone: (obj) => obj.kind === "None",
  isOption: (obj) => obj.kind === "Some" || obj.kind === "None",
  safe: (pred) => ifElse(pred, Some, None),
  zero: () => None(),
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
      (s) => Some(concatValues(this.value, s))
    );
  }

  ap(o) {
    return o.map(this.value);
  }

  alt(other) {
    return this;
  }

  toString() {
    return this.inspect();
  }
}

export const Some = (x) => new S(x);

class N {
  constructor(value) {
    this._value = value;

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
    return f();
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

  alt(other) {
    return other.isSome() ? other : this;
  }

  toString() {
    return this.inspect();
  }
}

export const None = () => new N();
