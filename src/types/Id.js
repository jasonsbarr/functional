import { VariantInfo, createType } from "./createType.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import {
  Alt,
  Applicative,
  Apply,
  Bifunctor,
  Functor,
  Monad,
  Monoid,
  Fold,
  SemiGroup,
} from "./typeClasses.js";

const variantInfos = [
  VariantInfo(
    "Id",
    [Fold, Functor, Apply, Monad, Bifunctor, Alt, SemiGroup],
    {},
    {
      sTypeClasses: [Monoid, Applicative],
      methods: {
        of(x) {
          return Id(x);
        },

        empty() {
          return Id();
        },

        isId(x) {
          return isFunction(x.isId) && x.isId();
        },
      },
    }
  ),
];

export const { Id } = createType("Identity", variantInfos);
