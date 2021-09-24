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
import { min } from "@jasonsbarr/functional-core/functions/math/min.js";

const variantInfos = [
  VariantInfo(
    "Min",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Min(min(this.value, y));
      },

      init() {
        if (!isNumber(this.value)) {
          throw new Error("Value of Min must be a number");
        }
      },
    },
    {
      sTypeClasses: [Monoid],
      methods: {
        empty() {
          return Min(Infinity);
        },

        isMin(x) {
          return x && isFunction(x.isMin) && x.isMin();
        },
      },
    }
  ),
];

export const { Min } = createType("Min", variantInfos);
