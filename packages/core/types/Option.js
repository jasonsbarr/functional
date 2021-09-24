import { ifElse } from "../core/helpers/ifElse.js.js.js";
import { isFunction } from "../core/predicates/isFunction.js";
import { isNullish } from "../core/predicates/isNullish.js.js.js";
import { VariantInfo, createType } from "./createType.js.js.js.js";
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
  VariantInfo("Some", [
    RightFold,
    Functor,
    Apply,
    Monad,
    RightBifunctor,
    RightBimonad,
    Alt,
    RightSemiGroup,
  ]),
  VariantInfo("None", [
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
