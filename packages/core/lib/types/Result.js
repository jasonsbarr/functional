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
    "Ok",
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
    "Err",
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
    ],
    {
      lte(other) {
        return this.equals(other);
      },
    }
  ),
];

export const Result = createType(
  "Result",
  variantInfos,
  [Monoid, Applicative, Plus],
  {
    of(x) {
      if (x instanceof Error) {
        return Result.Err(x);
      }
      return Result.Ok(x);
    },
    empty() {
      return Result.Ok();
    },

    zero() {
      return Err();
    },

    isOk(x) {
      return x && isFunction(x.isOk) && x.isOk();
    },

    isErr(x) {
      return x && isFunction(x.isErr) && x.isErr();
    },
  }
);

export const { Ok, Err } = Result;

export const tryCatch = (fn) => {
  try {
    return Result.Ok(fn());
  } catch (e) {
    return Result.Err(e);
  }
};
