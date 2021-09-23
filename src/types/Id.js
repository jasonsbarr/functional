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
    [
      Fold,
      Functor,
      Apply,
      Monad,
      Bifunctor,
      Alt,
      SemiGroup,
      Monoid,
      Applicative,
    ],
    {
      isId() {
        return true;
      },
    },
    {
      of(x) {
        return Identity.Id(x);
      },

      empty() {
        return Identity.Id();
      },
    }
  ),
];

const Identity = createType("Identity", variantInfos);

const { Id } = Identity;
Id.isId = (x) => isFunction(x.isId) && x.isId();
Id.of = Identity.of;
Id.empty = Identity.empty;
export { Id };
