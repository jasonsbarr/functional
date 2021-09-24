import { isFunction } from "../core/predicates/isFunction.js";
import { VariantInfo, createType } from "./createType.js";
import {
  RightAlt,
  Applicative,
  Apply,
  RightBifunctor,
  RightBichain,
  Functor,
  LeftAlt,
  LeftApply,
  LeftBifunctor,
  LeftBichain,
  LeftFold,
  LeftFunctor,
  LeftChain,
  LeftSemiGroup,
  Chain,
  Monoid,
  RightFold,
  RightSemiGroup,
} from "./typeClasses.js";

const variantInfos = [
  VariantInfo("Right", [
    RightFold,
    Functor,
    Apply,
    Chain,
    RightBifunctor,
    RightBichain,
    RightAlt,
    RightSemiGroup,
  ]),
  VariantInfo("Left", [
    LeftFold,
    LeftFunctor,
    LeftApply,
    LeftChain,
    LeftBifunctor,
    LeftBichain,
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
