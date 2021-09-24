import { VariantInfo, createType } from "./createType.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import {
  Applicative,
  Apply,
  Functor,
  Monad,
  Monoid,
  Fold,
  SemiGroup,
} from "./typeClasses.js";

const variantInfos = [
  VariantInfo(
    "Effect",
    [Apply, Fold, Functor, Monad, SemiGroup],
    {
      map(f) {
        return Effect((x) => f(this.value(x)));
      },

      chain(f) {
        return (x) => f(this.value(x));
      },

      concat({ value: f }) {
        return Effect(this.value(f));
      },

      ap(o) {
        return o.map((g) => g(this.value()));
      },

      fold(f) {
        return (x) => f(this.value(x));
      },

      run(x) {
        return this.value(x);
      },

      inspect() {
        return `Effect(${this.value.toString()})`;
      },

      init() {
        if (!isFunction(this.value)) {
          throw new Error("Value of Effect type must be a function");
        }
      },
    },
    {
      sTypeClasses: [Applicative, Monoid],
      methods: {
        of(f) {
          return Effect(f);
        },

        empty() {
          return Effect(() => {});
        },

        isEffect(x) {
          return x && isFunction(x.isEffect) && x.isEffect();
        },
      },
    }
  ),
];

export const { Effect } = createType("Effect", variantInfos);
