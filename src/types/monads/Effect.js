class Eff {
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
      value: "Effect",
    });

    Object.defineProperty(this, "constructor", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Effect,
    });
  }

  get value() {
    return this._value;
  }

  map(f) {
    return Effect((x) => f(this.value(x)));
  }

  chain(f) {
    return (x) => f(this.value(x));
  }

  fold(f) {
    return (x) => f(this.value(x));
  }

  ap(f) {
    return f.map((g) => g(this.value()));
  }

  run(x) {
    return this.value(x);
  }
}

const Effect = (f) => new Eff(f);

Effect.of = (v) => Effect(() => v);
