import {
  VariantInfo,
  createType,
} from "@jasonsbarr/functional-core/functions/type/createType.js";
import {
  SemiGroup,
  Monoid,
  Setoid,
  Fold,
} from "@jasonsbarr/functional-core/types/typeClasses.js";
import { isFunction } from "@jasonsbarr/functional-core/functions/predicates/isFunction.js";
import { boolean } from "@jasonsbarr/functional-core/functions/type/boolean.js";

const variantInfos = [
  VariantInfo(
    "All",
    [SemiGroup, Setoid, Fold],
    {
      concat({ value: y }) {
        return All(this.value && y);
      },

      init() {
        this.value = boolean(this.value);
      },
    },
    {
      sTypeClasses: [Monoid],
      methods: {
        empty() {
          return All(true);
        },

        isAll(x) {
          return x && isFunction(x.isAll) && x.isAll();
        },
      },
    }
  ),
];

export const { All } = createType("All", variantInfos);
