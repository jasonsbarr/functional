/*
 * type Either = Right(x: R) | Left(x: L)
 */

import { concat } from "../functions/helpers/concatValues.js";
import { curry } from "../functions/lambda/curry.js";

export const Either = {
  of: curry((pred, x) => (pred(x) ? Right(x) : Left(x))),
  isRight: (obj) => obj.kind === "Right",
  isLeft: (obj) => obj.kind === "Left",
  isEither: (obj) => obj.kind === "Right" || obj.kind === "Left",
};

class R {
  constructor(value) {
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
      value: "Right",
    });

    Object.defineProperty(this, "constructor", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Right,
    });
  }

  get value() {
    return this._value;
  }

  map(f) {
    return Right(f(this.value));
  }

  chain(f) {
    return f(this.value);
  }

  fold(f, g) {
    return g(this.value);
  }

  inspect() {
    return `Right(${this.value})`;
  }

  isLeft() {
    return false;
  }

  isRight() {
    return true;
  }

  concat(o) {
    return o.fold(
      (l) => Left(l.value),
      (r) => Right(concatValues(this.value, r.value))
    );
  }

  ap(o) {
    return o.map(this.value);
  }

  toString() {
    return this.inspect();
  }
}

export const Right = (x) => new R(x);

class L {
  constructor(value) {
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
      value: "Left",
    });

    Object.defineProperty(this, "constructor", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Left,
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
    return `Left(${this.value})`;
  }

  isLeft() {
    return true;
  }

  isRight() {
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

export const Left = (x) => new L(x);
