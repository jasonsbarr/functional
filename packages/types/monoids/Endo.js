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
import { identity } from "@jasonsbarr/functional-core/functions/helpers/identity.js";

const variantInfos = [
  VariantInfo(
    "Endo",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Endo(this.value(y));
      },

      inspect() {
        return `Endo(${this.value.toString()})`;
      },

      init() {
        if (!isFunction(this.value)) {
          throw new Error("Value of Endo type must be a function");
        }
      },
    },
    {
      sTypeClasses: [Monoid],
      methods: {
        empty() {
          return Endo(identity);
        },

        isEndo(x) {
          return x && isFunction(x.isEndo) && x.isEndo();
        },
      },
    }
  ),
];

export const { Endo } = createType("Endo", variantInfos);
