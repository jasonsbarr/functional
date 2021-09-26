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
    "First",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return First(Option.isSome(this.value) ? this.value : y);
      },

      inspect() {
        return `First(${this.value.inspect()})`;
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
          return First(None());
        },

        isFirst(x) {
          return x && isFunction(x.isFirst) && x.isFirst();
        },

        variants: ["First"],
      },
    }
  ),
];

export const { First } = createType("First", variantInfos);
