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
  VariantInfo("Right", [
    RightClass,
    RightFold,
    Functor,
    Apply,
    Monad,
    Bifunctor,
    Alt,
    RightSemiGroup,
  ]),
  VariantInfo("Left", [
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

export const Either = createType(
  "Either",
  variantInfos,
  [Monoid, Applicative],
  {
    of(x) {
      return Either.Right(x);
    },

    empty() {
      return Either.Left(null);
    },

    isEither(x) {
      return x.type === "Either";
    },
  }
);

const { Left, Right } = Either;
export { Left };
export { Right };
