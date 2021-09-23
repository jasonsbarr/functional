import { isFunction } from "../functions/predicates/isFunction.js";
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
  VariantInfo(
    "Right",
    [
      RightClass,
      RightFold,
      Functor,
      Apply,
      Monad,
      Bifunctor,
      Alt,
      RightSemiGroup,
    ],
    {
      inspect() {
        return `Right(${this.value})`;
      },
    }
  ),
  VariantInfo(
    "Left",
    [
      LeftClass,
      LeftFold,
      LeftFunctor,
      LeftApply,
      LeftMonad,
      LeftBifunctor,
      LeftAlt,
      LeftSemiGroup,
    ],
    {
      inspect() {
        return `Left(${this.value})`;
      },
    }
  ),
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
      return isFunction(x.isLeft) && x.isLeft();
    },

    isRight(x) {
      return isFunction(x.isRight) && x.isRight();
    },
  }
);

export const { Left, Right } = Either;
