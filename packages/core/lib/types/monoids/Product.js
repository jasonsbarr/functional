import { VariantInfo, createType } from "./createType.js";
import { Fold, Monoid, SemiGroup, Setoid } from "./typeClasses.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import { isNumber } from "../functions/predicates/isNumber.js";

const variantInfos = [
  VariantInfo(
    "Product",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Product(this.value * y);
      },

      init() {
        if (!isNumber(this.value)) {
          throw new Error("Value of Product must be a number");
        }
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
