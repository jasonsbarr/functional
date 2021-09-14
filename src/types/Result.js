/*
 * type Result = Success(x: Ok) | Failure(x: Error)
 */

export const Result = {
  of: (x) => (x instanceof Error ? Err(x) : Ok(x)),
  isOk: (obj) => obj.kind === "Ok",
  isErr: (obj) => obj.kind === "Err",
  isResult: (obj) => obj.kind === "Ok" || obj.kind === "Err",
};

class O {
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
      value: "Ok",
    });

    Object.defineProperty(this, "constructor", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Ok,
    });
  }

  get value() {
    return this._value;
  }

  map(f) {
    return Result.of(f(this.value));
  }

  chain(f) {
    return f(this.value);
  }

  fold(f, g) {
    return g(this.value);
  }

  inspect() {
    return `Ok(${this.value})`;
  }

  isErr() {
    return false;
  }

  isOk() {
    return true;
  }

  concat(o) {
    return o.fold(
      (e) => Err(e),
      (ok) => Ok(this.value.concat(ok))
    );
  }

  ap(o) {
    return this.map(o.value);
  }

  toString() {
    return this.inspect();
  }
}

export const Ok = (x) => new O(x);

class E {
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
      value: "Err",
    });

    Object.defineProperty(this, "constructor", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Err,
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
    return `Err(${this.value})`;
  }

  isErr() {
    return true;
  }

  isOk() {
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

export const Err = (x) => new E(x);

export const tryCatch = (f) => {
  try {
    return Ok(f());
  } catch (e) {
    return Err(e);
  }
};
