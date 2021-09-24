import { ifElse } from "../functions/helpers/ifElse.js";
import { isFunction } from "../functions/predicates/isFunction.js";
import { isNullish } from "../functions/predicates/isNullish.js";
import { VariantInfo, createType } from "../functions/type/createType.js";
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
