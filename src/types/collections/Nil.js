class Nil {
  constructor() {
    Object.defineProperty(this, "kind", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: "Nil",
    });
  }

  map(fn) {
    return this;
  }

  chain(fn) {
    return this;
  }

  concat(other) {
    return this;
  }

  fold() {
    return null;
  }

  toString() {
    return "Nil()";
  }

  inspect() {
    return this.toString();
  }
}

export const NIL = new Nil();
