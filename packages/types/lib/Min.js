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
import { min } from "@jasonsbarr/functional-core/lib/math/min.js";

const variantInfos = [
  VariantInfo(
    "Min",
    [],
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Min(min(this.value, y));
      },

      init() {
        if (!isNumber(this.value) || isNotANum(this.value)) {
          throw new Error("Value of Min must be a number that is not NaN");
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

        variants: ["Min"],
      },
    }
  ),
];

export const { Min } = createType("Min", variantInfos);
