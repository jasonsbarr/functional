import { VariantInfo, createType } from "./createType.js";
import { Fold, Monoid, SemiGroup, Setoid } from "./typeClasses.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import { Option, None } from "./Option.js";

const variantInfos = [
  VariantInfo(
    "Last",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Last(Option.isSome(y) ? y : this.value);
      },

      inspect() {
        return `Last(${this.value.inspect()})`;
      },

      init() {
        this.value = Option.isOption(this.value)
          ? this.value
          : Option.of(this.value);
      },
    },
    {
      sTypeClasses: [Monoid],
      methods: {
        empty() {
          return Last(None());
        },

        isLast(x) {
          return x && isFunction(x.isLast) && x.isLast();
        },
      },
    }
  ),
];

export const { Last } = createType("Last", variantInfos);
