import {
  VariantInfo,
  createType,
} from "@jasonsbarr/functional-core/lib/types/createType.js";
import {
  Fold,
  Monoid,
  Setoid,
  SemiGroup,
} from "@jasonsbarr/functional-core/lib/types/typeClasses.js";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction.js";
import { isNumber } from "@jasonsbarr/functional-core/lib/predicates/isNumber.js";
import { isNotANum } from "@jasonsbarr/functional-core/lib/predicates/isNotANum.js";
import { max } from "@jasonsbarr/functional-core/lib/math/max.js";

const variantInfos = [
  VariantInfo(
    "Max",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Max(max(this.value, y));
      },

      init() {
        if (!isNumber(this.value) || isNotANum(this.value)) {
          throw new Error("Value of Max must be a number that is not NaN");
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

        variants: ["Max"],
      },
    }
  ),
];

export const { Max } = createType("Max", variantInfos);
