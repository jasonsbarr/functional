import {
  VariantInfo,
  createType,
} from "@jasonsbarr/functional-core/lib/types/createType.js";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction.js";
import {
  Applicative,
  Apply,
  Functor,
  Chain,
  Monoid,
  Fold,
  SemiGroup,
} from "@jasonsbarr/functional-core/lib/types/typeClasses.js";

const variantInfos = [
  VariantInfo(
    "Effect",
    [],
    [Apply, Fold, Functor, Chain, SemiGroup],
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

        variants: ["Effect"],
      },
    }
  ),
];

export const { Effect } = createType("Effect", variantInfos);
