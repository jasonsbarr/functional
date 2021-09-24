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
    "Ok",
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
        return `Ok(${this.value})`;
      },
    }
  ),
  VariantInfo(
    "Err",
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
        return `Err(${this.value})`;
      },
    }
  ),
];

export const Result = createType(
  "Result",
  variantInfos,
  [Monoid, Applicative],
  {
    of(x) {
      if (x instanceof Error) {
        return Result.Err(x);
      }
      return Result.Ok(x);
    },
    empty() {
      return Result.Err(new Error());
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
