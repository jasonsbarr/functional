import { ifElse } from "../functions/helpers/ifElse.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import { isNullish } from "../functions/predicates/isNullish.js";
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
    "Some",
    [
      RightFold,
      Functor,
      Apply,
      Monad,
      RightBifunctor,
      RightBimonad,
      Alt,
      RightSemiGroup,
    ],
    {
      inspect() {
        return `Some(${this.value})`;
      },
    }
  ),
  VariantInfo(
    "None",
    [
      LeftFold,
      LeftFunctor,
      LeftApply,
      LeftMonad,
      LeftBifunctor,
      LeftBimonad,
      LeftAlt,
      LeftSemiGroup,
    ],
    {
      inspect() {
        return `None(${this.value})`;
      },
    }
  ),
];

export const Option = createType(
  "Option",
  variantInfos,
  [Monoid, Applicative],
  {
    of(x) {
      return isNullish(x) ? Option.None(x) : Option.Some(x);
    },

    empty() {
      return Option.None();
    },

    isSome(x) {
      return isFunction(x.isSome) && x.isSome();
    },

    isNone(x) {
      return isFunction(x.isNone) && x.isNone();
    },
  }
);

export const { Some, None } = Option;

export const safe = (pred) => ifElse(pred, Option.Some, Option.None);
