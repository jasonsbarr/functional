import { VariantInfo, createType } from "./createType.js";
import { Fold, Monoid, SemiGroup, Setoid } from "./typeClasses.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import { assign } from "../functions/object/assign.js";

const variantInfos = [
  VariantInfo(
    "Assign",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return assign({}, this.value, y);
      },

      inspect() {
        return `Assign(${this.value})`;
      },
    },
    {
      sTypeClasses: [Monoid],
      methods: {
        empty() {
          return {};
        },

        isAssign(x) {
          return x && isFunction(x.isAssign) && x.isAssign();
        },
      },
    }
  ),
];
