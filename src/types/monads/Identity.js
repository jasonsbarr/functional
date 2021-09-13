class I {
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
      enumerable: false,
      writable: false,
      value: "Identity",
    });

    Object.defineProperty(this, "constructor", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Identity,
    });
  }

  get value() {
    return this._value;
  }

  map(fn) {
    return Identity(fn(x));
  }
  chain(fn) {
    return fn(x);
  }
  fold(fn) {
    return fn(x);
  }
  inspect() {
    return `Identity(${x})`;
  }
  concat(o) {
    return Identity(x.concat(o));
  }

  ap(i) {
    return i.chain((f) => this.map(f));
  }

  toString() {
    return this.inspect();
  }
}

export const Identity = (x) => new I(x);

Identity.of = (x) => Identity(x);
Identity.isIdentity = (obj) => obj.kind === "Identity";
