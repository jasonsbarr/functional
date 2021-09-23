import { VariantInfo, createType } from "./createType.js";
import {
  Alt,
  Applicative,
  Apply,
  Bifunctor,
  Functor,
  LeftAlt,
  LeftApply,
  LeftBifunctor,
  LeftClass,
  LeftFold,
  LeftFunctor,
  LeftMonad,
  LeftSemiGroup,
  Monad,
  Monoid,
  RightClass,
  RightFold,
  RightSemiGroup,
} from "./typeClasses.js";

const variantInfos = [
  VariantInfo("Ok", [
    RightClass,
    RightFold,
    Functor,
    Apply,
    Monad,
    Bifunctor,
    Alt,
    RightSemiGroup,
  ]),
  VariantInfo("Err", [
    LeftClass,
    LeftFold,
    LeftFunctor,
    LeftApply,
    LeftMonad,
    LeftBifunctor,
    LeftAlt,
    LeftSemiGroup,
  ]),
];

export const Result = createType(
  "Result",
  variantInfos,
  [Monoid, Applicative],
  {
    of(x) {
      return Result.Right(x);
    },
    empty() {
      return Result.Left(null);
    },
  }
);
