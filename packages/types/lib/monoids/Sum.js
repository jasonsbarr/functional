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

const variantInfos = [
  VariantInfo(
    "Sum",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Sum(this.value + y);
      },

      init() {
        if (!isNumber(this.value) || isNotANum(this.value)) {
          throw new Error("Value of Sum must be a number that is not NaN");
        }
      },
    },
    {
      sTypeClasses: [Monoid],
      methods: {
        empty() {
          return Sum(0);
        },

        isSum(x) {
          return x && isFunction(x.isSum) && x.isSum();
        },

        variants: ["Sum"],
      },
    }
  ),
];

export const { Sum } = createType("Sum", variantInfos);
