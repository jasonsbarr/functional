import {
  VariantInfo,
  createType,
} from "@jasonsbarr/functional-core/lib/types/createType.js";
import {
  Fold,
  Monoid,
  SemiGroup,
  Setoid,
} from "@jasonsbarr/functional-core/lib/types/typeClasses.js";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction.js";
import { Option, None } from "@jasonsbarr/functional-core/lib/types/Option.js";

const variantInfos = [
  VariantInfo(
    "Last",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Last(Option.isSome(y) ? y : this.value);
      },

      inspect() {
        return `Last(${this.value.inspect()})`;
      },

      init() {
        this.value = Option.isOption(this.value)
          ? this.value
          : Option.of(this.value);
      },
    },
    {
      sTypeClasses: [Monoid],
      methods: {
        empty() {
          return Last(None());
        },

        isLast(x) {
          return x && isFunction(x.isLast) && x.isLast();
        },

        variants: ["Last"],
      },
    }
  ),
];

export const { Last } = createType("Last", variantInfos);
