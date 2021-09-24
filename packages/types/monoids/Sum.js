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

const variantInfos = [
  VariantInfo(
    "Sum",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Sum(this.value + y);
      },

      init() {
        if (!isNumber(this.value)) {
          throw new Error("Value of Sum must be a number");
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
      },
    }
  ),
];

export const { Sum } = createType("Sum", variantInfos);
