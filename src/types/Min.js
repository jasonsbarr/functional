import { VariantInfo, createType } from "./createType.js";
import { Fold, Monoid, Setoid, SemiGroup } from "./typeClasses.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import { isNumber } from "../functions/predicates/isNumber.js";
import { number } from "../functions/number/number.js";
import { min } from "../functions/math/min.js";

const variantInfos = [
  VariantInfo(
    "Min",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Min(min(this.value, y));
      },

      inspect() {
        return `Min(${this.value})`;
      },

      init() {
        this.value = isNumber(this.value) ? this.value : number(this.value);
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
