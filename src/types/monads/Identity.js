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
      enumerable: true,
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
    return Identity(fn(this.value));
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
    return Identity(this.value.concat(o));
  }

  ap(o) {
    return this.map(o.value);
  }

  toString() {
    return this.inspect();
  }
}

export const Identity = (x) => new I(x);

Identity.of = (x) => Identity(x);
Identity.isIdentity = (obj) => obj.kind === "Identity";
