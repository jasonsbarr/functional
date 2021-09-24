import { VariantInfo, createType } from "./createType.js";
import { Fold, Monoid, SemiGroup, Setoid } from "./typeClasses.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import { isNumber } from "../functions/predicates/isNumber.js";
import { number } from "../functions/number/number.js";

const variantInfos = [
  VariantInfo(
    "Product",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Product(this.value * y);
      },

      init() {
        this.value = isNumber(this.value) ? this.value : number(this.value);
      },
    },
    {
      sTypeClasses: [Monoid],
      methods: {
        empty() {
          return Product(1);
        },

        isProduct(x) {
          return x && isFunction(x.isProduct) && x.isProduct();
        },
      },
    }
  ),
];

export const { Product } = createType("Product", variantInfos);
