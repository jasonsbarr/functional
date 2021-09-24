import {
  VariantInfo,
  createType,
} from "@jasonsbarr/functional-core/functions/type/createType.js";
import {
  Fold,
  Monoid,
  SemiGroup,
  Setoid,
} from "@jasonsbarr/functional-core/types/typeClasses.js";
import { isFunction } from "@jasonsbarr/functional-core/functions/predicates/isFunction.js";
import { assign } from "@jasonsbarr/functional-core/functions/object/assign.js";
import { isObject } from "@jasonsbarr/functional-core/functions/predicates/isObject.js";

const variantInfos = [
  VariantInfo(
    "Assign",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Assign(assign({}, this.value, y));
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
