import { isFunction } from "../predicates/isFunction.js";
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
  Plus,
  RightFold,
  RightSemiGroup,
  Setoid,
  Ord,
} from "./typeClasses.js";

const variantInfos = [
  VariantInfo(
    "Right",
    [],
    [
      RightFold,
      Functor,
      Apply,
      Chain,
      RightBifunctor,
      RightBichain,
      RightAlt,
      RightSemiGroup,
      Setoid,
      Ord,
    ]
  ),
  VariantInfo(
    "Left",
    [],
    [
      LeftFold,
      LeftFunctor,
      LeftApply,
      LeftChain,
      LeftBifunctor,
      LeftBichain,
      LeftAlt,
      LeftSemiGroup,
      Setoid,
      Ord,
    ]
  ),
];

export const Either = createType(
  "Either",
  variantInfos,
  [Monoid, Applicative, Plus],
  {
    of(x) {
      return Either.Right(x);
    },

    empty() {
      return Either.Right();
    },

    zero() {
      return Either.Left();
    },

    isLeft(x) {
      return x && isFunction(x.isLeft) && x.isLeft();
    },

    isRight(x) {
      return x && isFunction(x.isRight) && x.isRight();
    },

    isEither(x) {
      return x && isFunction(x.isEither) && x.isEither();
    },
  }
);

export const { Left, Right } = Either;
