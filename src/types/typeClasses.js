// Right typeclasses
import { concatValues } from "../functions/helpers/concatValues.js";

export const RightClass = {
  isRight() {
    return true;
  },

  isLeft() {
    return false;
  },
};

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

export const Monad = {
  chain(f) {
    return f(this.value);
  },
};

export const Bifunctor = {
  bimap(leftFunc, rightFunc) {
    return this.constructor(rightFunc(this.value));
  },

  bichain(leftFunc, rightFunc) {
    return rightFunc(this.value);
  },
};

export const Alt = {
  alt(other) {
    return this;
  },
};

export const SemiGroup = {
  concat(o) {
    return this.constructor(concatValues(this.value, o.value));
  },
};

export const RightSemiGroup = {
  concat(o) {
    return o.fold(
      (l) => o.constructor(l),
      (r) => this.constructor(concatValues(this.value, r))
    );
  },
};

// Left typeclasses
export const LeftClass = {
  isRight() {
    return false;
  },

  isLeft() {
    return true;
  },
};

export const LeftFold = {
  fold(f, g) {
    return f(this.value);
  },
};

export const LeftFunctor = {
  map(f) {
    return this;
  },
};

export const LeftApply = {
  ap(other) {
    return this;
  },
};

export const LeftMonad = {
  chain(f) {
    return this;
  },
};

export const LeftBifunctor = {
  bimap(leftFunc, rightFunc) {
    return this.constructor(leftFunc(this.value));
  },

  bichain(leftFunc, rightFunc) {
    return leftFunc(this.value);
  },
};

export const LeftAlt = {
  alt(other) {
    return other.isRight() ? other : this;
  },
};

export const LeftSemiGroup = {
  concat(o) {
    return this;
  },
};

// for type representative
export const Applicative = {
  of() {
    throw new Error("of method must be implemented individually for each type");
  },
};

export const Monoid = {
  empty() {
    throw new Error(
      "empty method must be implemented individually for each type"
    );
  },
};
