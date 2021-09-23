import { VariantInfo, createType } from "./createType.js";
import { Fold, Monoid, SemiGroup, Setoid } from "./typeClasses.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import { Option, None } from "./Option.js";

const variantInfos = [
  VariantInfo(
    "First",
    [Fold, SemiGroup, Setoid],
    {
      concat({ value: y }) {
        return Option.isSome(this.value) ? value : y;
      },

      inspect() {
        return `First(${this.value})`;
      },

      init() {
        this.value = Option.isOption(this.value)
          ? this.value
          : Option.of(this.value);
      },

      valueOf() {
        return this.value;
      },
    },
    {
      sTypeClasses: [Monoid],
      methods: {
        empty() {
          return First(None());
        },
      },
    }
  ),
];

export const { First } = createType("First", variantInfos);

console.log(First("hello"));
