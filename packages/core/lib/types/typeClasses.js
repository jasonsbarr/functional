// Right typeclasses
import { concatValues } from "../helpers/concatValues.js";
import { equals } from "../object/equals.js";
import { identity } from "../helpers/identity.js";
import { eq } from "../predicates/eq.js";
import { lte } from "../core/lte.js";

// instance typeclasses
export const Apply = {
  ap(other) {
    return other.map(this.value);
  },
};

export const Bifunctor = {
  bimap(f, g) {
    throw new Error(
      "bimap method must be implemented for each type to implement Bifunctor"
    );
  },
};

export const Chain = {
  chain(f) {
    return f(this.value);
  },
};

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

// Ord must also implement Setoid
export const Ord = {
  lte(other) {
    return lte(this.value, other.value);
  },

  gt(other) {
    return !this.lte(other);
  },

  gte(other) {
    return this.gt(other) || this.equals(other);
  },

  lt(other) {
    return !this.gte(other);
  },

  compare(other) {
    return this.lt(other) ? -1 : this.equals(other) ? 0 : 1;
  },
};

export const SemiGroup = {
  concat(o) {
    return this.constructor(concatValues(this.value, o.value));
  },
};

export const Setoid = {
  equals(x) {
    return (
      eq(this.type, x.type) &&
      eq(this.variant, x.variant) &&
      equals(this.value, x.value)
    );
  },
};

export const Show = {
  toString() {
    throw new Error(
      "toString method must be implemented for each type to implement Show"
    );
  },
};

export const Swap = {
  swap(leftMapFn, rightMapFn) {
    throw new Error(
      "swap method must be implemented individually for each type to implement Swap"
    );
  },
};

export const Traversable = {
  traverse(point, fn) {
    throw new Error(
      "traverse method must be implemented individually for each type to implement Traversable"
    );
  },

  sequence(point) {
    return this.traverse(point, identity);
  },
};

// Right typeclasses
export const RightFold = {
  fold(f, g) {
    return g(this.value);
  },
};

export const RightBifunctor = {
  bimap(leftFunc, rightFunc) {
    return this.constructor(rightFunc(this.value));
  },
};

export const RightBichain = {
  bichain(leftFunc, rightFunc) {
    return rightFunc(this.value);
  },
};

export const RightAlt = {
  alt(other) {
    return this;
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

export const LeftChain = {
  chain(f) {
    return this;
  },
};

export const LeftBifunctor = {
  bimap(leftFunc, rightFunc) {
    return this.constructor(leftFunc(this.value));
  },
};

export const LeftBichain = {
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
    throw new Error(
      "of method must be implemented individually for each type to implement Applicative"
    );
  },
};

export const Monoid = {
  empty() {
    throw new Error(
      "empty method must be implemented individually for each type to implement Monoid"
    );
  },
};

export const Plus = {
  zero() {
    throw new Error(
      "zero method must be implemented individually for each type to implement Plus"
    );
  },
};
