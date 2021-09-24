import { VariantInfo, createType } from "./createType.js";
import {
  Applicative,
  Apply,
  Bifunctor,
  Chain,
  Fold,
  Functor,
  Monoid,
  SemiGroup,
  Setoid,
  Traversable,
} from "./typeClasses.js";
import { isArray } from "../functions/predicates/isArray.js";
import { length } from "../functions/iterable/length.js";
import { equals } from "../functions/object/equals.js";
import { concatValues } from "../functions/helpers/concatValues.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import { ne } from "../functions/predicates/ne.js";
import { eq } from "../functions/predicates/eq.js";

const variantInfos = [
  VariantInfo(
    "Pair",
    [Apply, Bifunctor, Chain, Fold, Functor, SemiGroup, Setoid, Traversable],
    {
      init() {
        // an array, tuple, or cons will work fine
        if (!isArray(this.value) || ne(length(this.value), 2)) {
          throw new Error(
            "The argument to Pair must be an array of exactly 2 elements"
          );
        }
        this.left = this.value[0];
        this.right = this.value[1];
      },

      first() {
        return this.left;
      },

      last() {
        return this.right;
      },

      inspect() {
        return `Pair(${this.left}, ${this.right})`;
      },

      toString() {
        return this.inspect();
      },

      toArray() {
        return [this.left, this.right];
      },

      toObject() {
        return { first: this.left, last: this.right };
      },

      swap(f, g) {
        return Pair.of(g(this.right), f(this.left));
      },

      // Setoid
      equals(o) {
        return (
          o &&
          eq(o.type, "Pair") &&
          equals(this.left, o.left) &&
          equals(this.right, o.right)
        );
      },

      // SemiGroup
      concat({ left: l, right: r }) {
        return Pair.of(concatValues(this.left, l), concatValues(this.right, r));
      },

      // Functor
      map(f) {
        return Pair.of(this.left, f(this.right));
      },

      // Bifunctor
      bimap(f, g) {
        return Pair.of(f(this.left), g(this.right));
      },

      // Apply
      ap(o) {
        const fn = this.right;
        if (!isFunction(fn)) {
          throw new Error("Pair.ap: right value must be a function");
        }
        const l = this.left;
        const l2 = o.left;

        return Pair.of(concatValues(l, l2), fn(o.right));
      },

      // Chain
      chain(fn) {
        const l = this.left;
        const m = fn(this.right); // returns a pair
        const l2 = m.left;
        return Pair.of(concatValues(l, l2), m.right);
      },

      // Fold
      fold(fn, initial) {
        let acc = initial;
        for (let val of this.value) {
          acc = fn(acc, val);
        }
        return acc;
      },

      reduce(fn) {
        return this.fold(fn);
      },

      // Traversable
      traverse(point, fn) {
        const m = fn(this.right); // MUST return a Functor
        return m.map((v) => Pair.of(this.left, v));
      },
    },
    {
      sTypeClasses: [Applicative, Monoid],
      methods: {
        fromObject({ first, last }) {
          return Pair([first, last]);
        },

        // Applicative
        of(first, last) {
          if (ne(length(arguments), 2)) {
            throw new Error("Pair constructor takes exactly 2 arguments");
          }
          return Pair([first, last]);
        },

        // Monoid
        empty() {
          return Pair.of(null, null);
        },

        isPair(x) {
          return x && isFunction(x.isPair) && x.isPair();
        },
      },
    }
  ),
];

export const { Pair } = createType("Pair", variantInfos);
