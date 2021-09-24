import { VariantInfo, createType } from "./createType.js";
import { Fold, Monoid, Setoid, SemiGroup } from "./typeClasses.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import { isNumber } from "../functions/predicates/isNumber.js";
import { number } from "../functions/number/number.js";

const variantInfos = [
  VariantInfo(
    "Sum",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Sum(this.value + y);
      },

      inspect() {
        return `Sum(${this.value})`;
      },

      init() {
        this.value = isNumber(this.value) ? this.value : number(this.value);
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
