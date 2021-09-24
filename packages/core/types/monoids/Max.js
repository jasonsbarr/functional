import { VariantInfo, createType } from "./createType.js";
import { Fold, Monoid, Setoid, SemiGroup } from "./typeClasses.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import { isNumber } from "../functions/predicates/isNumber.js";
import { max } from "../functions/math/max.js";

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
