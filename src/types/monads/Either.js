/*
 * type Either = Right(x: R) | Left(x: L)
 */

export const Either = {
  of: (pred) => (x) => pred(x) ? Right(x) : Left(x),
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
      enumerable: false,
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
    return Right(f(x));
  }

  chain(f) {
    return f(x);
  }

  fold(f, g) {
    return g(x);
  }

  inspect() {
    return `Right(${x})`;
  }

  isLeft() {
    return false;
  }

  isRight() {
    return true;
  }

  concat(o) {
    return o.fold(
      (l) => Left(l),
      (r) => Right(x.concat(r))
    );
  }

  ap(o) {
    return o.chain((f) => this.map(f));
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
      enumerable: false,
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
    return Left(x);
  }

  chain(f) {
    return Left(x);
  }

  fold(f, g) {
    return f(x);
  }

  inspect() {
    return `Left(${x})`;
  }

  isLeft() {
    return true;
  }

  isRight() {
    return false;
  }

  concat(o) {
    return Left(x);
  }

  ap(o) {
    return o.chain((f) => this.map(f));
  }

  toString() {
    return this.inspect();
  }
}

export const Left = (x) => new L(x);

console.log(Right(10));
