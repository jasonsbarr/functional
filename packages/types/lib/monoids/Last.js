import {
  VariantInfo,
  createType,
} from "@jasonsbarr/functional-core/types/createType.js";
import {
  Fold,
  Monoid,
  SemiGroup,
  Setoid,
} from "@jasonsbarr/functional-core/types/typeClasses.js";
import { isFunction } from "@jasonsbarr/functional-core/predicates/isFunction.js";
import { Option, None } from "@jasonsbarr/functional-core/types/Option.js";

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
      },
    }
  ),
];

export const { Last } = createType("Last", variantInfos);
