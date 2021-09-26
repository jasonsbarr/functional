import { ifElse } from "../helpers/ifElse.js";
import { isFunction } from "../predicates/isFunction.js";
import { isNullish } from "../predicates/isNullish.js";
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
  VariantInfo("Some", [
    RightFold,
    Functor,
    Apply,
    Chain,
    RightBifunctor,
    RightBichain,
    RightAlt,
    RightSemiGroup,
  ]),
  VariantInfo("None", [
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

export const Option = createType(
  "Option",
  variantInfos,
  [Monoid, Applicative],
  {
    of(x) {
      return isNullish(x) ? Option.None(x) : Option.Some(x);
    },

    empty() {
      return Option.Some();
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
