// Right typeclasses
import { concatValues } from "../helpers/concatValues.js";
import { equals } from "../object/equals.js";
import { identity } from "../helpers/identity.js";
import { eq } from "../predicates/eq.js";

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

export const Chain = {
  chain(f) {
    return f(this.value);
  },
};

export const Bifunctor = {
  bimap(f, g) {
    throw new Error("bimap method must be implemented on the instance");
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

export const Setoid = {
  equals(x) {
    return (
      eq(this.type, x.type) &&
      eq(this.variant, x.variant) &&
      equals(this.value, x.value)
    );
  },
};

export const Traversable = {
  traverse(point, fn) {
    throw new Error(
      "Traverse method must be implemented individually for each type"
    );
  },

  sequence(point) {
    return this.traverse(point, identity);
  },
};

export const Swap = {
  swap(leftMapFn, rightMapFn) {
    throw new Error(
      "Swap method must be implemented individually for each type"
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

export const Plus = {
  zero() {
    throw new Error(
      "zero method must be implemented individually for each type"
    );
  },
};
