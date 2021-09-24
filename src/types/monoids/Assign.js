import { VariantInfo, createType } from "./createType.js";
import { Fold, Monoid, SemiGroup, Setoid } from "./typeClasses.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import { assign } from "../functions/object/assign.js";
import { isObject } from "../functions/predicates/isObject.js";

const variantInfos = [
  VariantInfo(
    "Assign",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Assign(assign({}, this.value, y));
      },

      inspect() {
        return `Assign(${this.value})`;
      },

      init() {
        this.value = isObject(this.value) ? this.value : Object(this.value);
      },
    },
    {
      sTypeClasses: [Monoid],
      methods: {
        empty() {
          return Assign({});
        },

        isAssign(x) {
          return x && isFunction(x.isAssign) && x.isAssign();
        },
      },
    }
  ),
];

export const { Assign } = createType("Assign", variantInfos);
