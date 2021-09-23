// Right typeclasses
export const Fold = {
  fold(f) {
    return f(this.value);
  },
};

export const RightFold = {
  fold(f, g) {
    return g(this.value);
  },
};

export const Functor = {
  map(f) {
    return this.constructor(f(this.value));
  },
};

export const Apply = {
  ap(other) {
    return other.map(this.value);
  },
};

// Left typeclasses
export const LeftFold = {
  fold(f, g) {
    return f(this.value);
  },
};

export const LeftFunctor = {
  map(f) {
    return this.value;
  },
};

// for type representative
export const Applicative = {
  of() {
    throw new Error("of method must be implemented individually for each type");
  },
};
