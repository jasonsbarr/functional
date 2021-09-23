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
    "Ok",
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
        return `Ok(${this.value})`;
      },
    }
  ),
  VariantInfo(
    "Err",
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
