// A tuple is immutable, like in Python.
// Objects inside it, however (not primitives!), can be mutated.
class Tuple extends Array {
  constructor(...args) {
    super(...args);
    Object.freeze(this);
  }

  toString() {
    return `Tuple(${super.toString().split(",").join(", ")})`;
  }

  inspect() {
    return this.toString();
  }
}

export const tuple = (...args) => new Tuple(...args);
