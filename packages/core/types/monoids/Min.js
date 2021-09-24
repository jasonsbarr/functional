import { VariantInfo, createType } from "../../functions/type/createType.js";
import { Fold, Monoid, Setoid, SemiGroup } from "../typeClasses.js";
import { isFunction } from "../../functions/predicates/isFunction.js";
import { isNumber } from "../../functions/predicates/isNumber.js";
import { min } from "../../functions/math/min.js";

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
