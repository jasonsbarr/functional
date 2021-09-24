import {
  VariantInfo,
  createType,
} from "@jasonsbarr/functional-core/functions/type/createType.js";
import {
  Fold,
  Monoid,
  Setoid,
  SemiGroup,
} from "@jasonsbarr/functional-core/types/typeClasses.js";
import { isFunction } from "@jasonsbarr/functional-core/functions/predicates/isFunction.js";
import { isNumber } from "@jasonsbarr/functional-core/functions/predicates/isNumber.js";
import { max } from "@jasonsbarr/functional-core/functions/math/max.js";

const variantInfos = [
  VariantInfo(
    "Max",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Max(max(this.value, y));
      },

      init() {
        if (!isNumber(this.value)) {
          throw new Error("Value of Max must be a number");
        }
      },
    },
    {
      sTypeClasses: [Monoid],
      methods: {
        empty() {
          return Max(-Infinity);
        },

        isMax(x) {
          return x && isFunction(x.isMax) && x.isMax();
        },
      },
    }
  ),
];

export const { Max } = createType("Max", variantInfos);
