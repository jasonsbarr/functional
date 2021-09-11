// A tuple is immutable, like in Python.
// Objects inside it, however (not primitives!), can be mutated.
class Tuple extends Array {
  constructor(...args) {
    super(...args);
    Object.freeze(this);

    Object.defineProperty(this, "kind", {
      configurable: false,
      enumerable: false,
      writable: true,
      value: "Tuple",
    });

    Object.defineProperty(this, "constructor", {
      configurable: false,
      enumerable: false,
      writable: true,
      value: tuple,
    });

    Object.defineProperty(this, "size", {
      configurable: false,
      enumerable: false,
      writable: true,
      value: this.length,
    });
  }

  toString() {
    return `Tuple(${super.toString().split(",").join(", ")})`;
  }

  inspect() {
    return this.toString();
  }
}

export const tuple = (...args) => new Tuple(...args);

Tuple.of = (iter) => tuple(...iter);
