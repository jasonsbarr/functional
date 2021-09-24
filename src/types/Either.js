import { isFunction } from "../functions/predicates/isFunction.js";
import { VariantInfo, createType } from "./createType.js";
import {
  Alt,
  Applicative,
  Apply,
  RightBifunctor,
  RightBimonad,
  Functor,
  LeftAlt,
  LeftApply,
  LeftBifunctor,
  LeftBimonad,
  LeftFold,
  LeftFunctor,
  LeftMonad,
  LeftSemiGroup,
  Monad,
  Monoid,
  RightFold,
  RightSemiGroup,
} from "./typeClasses.js";

const variantInfos = [
  VariantInfo("Right", [
    RightFold,
    Functor,
    Apply,
    Monad,
    RightBifunctor,
    RightBimonad,
    Alt,
    RightSemiGroup,
  ]),
  VariantInfo("Left", [
    LeftFold,
    LeftFunctor,
    LeftApply,
    LeftMonad,
    LeftBifunctor,
    LeftBimonad,
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

    isLeft(x) {
      return x && isFunction(x.isLeft) && x.isLeft();
    },

    isRight(x) {
      return x && isFunction(x.isRight) && x.isRight();
    },
  }
);

export const { Left, Right } = Either;
