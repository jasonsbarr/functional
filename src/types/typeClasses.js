export const Fold = {
  fold(f) {
    return f(this.value);
  },
};

export const Functor = {
  map(f) {
    return this.constructor(f(this.value));
  },
};

export const Apply = {
  ap(other) {},
};
