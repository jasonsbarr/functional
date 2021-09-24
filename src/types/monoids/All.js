import { VariantInfo, createType } from "../createType.js";
import { SemiGroup, Monoid, Setoid, Fold } from "../typeClasses.js";
import { isFunction } from "../../functions/predicates/isFunction.js";
import { boolean } from "../../functions/type/boolean.js";

const variantInfos = [
  VariantInfo(
    "All",
    [SemiGroup, Setoid, Fold],
    {
      concat({ value: y }) {
        return All(this.value && y);
      },
      inspect() {
        return `All(${this.value})`;
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
