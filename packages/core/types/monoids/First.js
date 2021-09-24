import { VariantInfo, createType } from "../../functions/type/createType.js";
import { Fold, Monoid, SemiGroup, Setoid } from "../typeClasses.js";
import { isFunction } from "../../functions/predicates/isFunction.js";
import { Option, None } from "../Option.js";

const variantInfos = [
  VariantInfo(
    "First",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return First(Option.isSome(this.value) ? this.value : y);
      },

      inspect() {
        return `First(${this.value.inspect()})`;
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
          return First(None());
        },

        isFirst(x) {
          return x && isFunction(x.isFirst) && x.isFirst();
        },
      },
    }
  ),
];

export const { First } = createType("First", variantInfos);
