import {
  VariantInfo,
  createType,
} from "@jasonsbarr/functional-core/lib/types/createType.js";
import {
  Fold,
  Monoid,
  SemiGroup,
  Setoid,
} from "@jasonsbarr/functional-core/lib/types/typeClasses.js";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction.js";
import { isNumber } from "@jasonsbarr/functional-core/lib/predicates/isNumber.js";
import { isNotANum } from "@jasonsbarr/functional-core/lib/predicates/isNotANum.js";

const variantInfos = [
  VariantInfo(
    "Product",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Product(this.value * y);
      },

      init() {
        if (!isNumber(this.value) || isNotANum(this.value)) {
          throw new Error("Value of Product must be a number that is not NaN");
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

        variants: ["Product"],
      },
    }
  ),
];

export const { Product } = createType("Product", variantInfos);
