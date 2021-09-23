import { VariantInfo, createType } from "./createType.js";
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
  VariantInfo("Id", [Fold, Functor, Apply, Monad, Bifunctor, Alt, SemiGroup]),
];

const Identity = createType("Identity", variantInfos, [Monoid, Applicative], {
  of(x) {
    return Identity.Id(x);
  },

  empty() {
    return Identity.Id();
  },
});

export const { Id } = Identity;
