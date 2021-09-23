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
  VariantInfo("Ok", [
    RightClass,
    RightFold,
    Functor,
    Apply,
    Monad,
    Bifunctor,
    Alt,
    RightSemiGroup,
  ]),
  VariantInfo("Err", [
    LeftClass,
    LeftFold,
    LeftFunctor,
    LeftApply,
    LeftMonad,
    LeftBifunctor,
    LeftAlt,
    LeftSemiGroup,
  ]),
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

const { Ok, Err } = Result;
export { Ok };
export { Err };

export const tryCatch = (fn) => {
  try {
    return Result.Ok(fn());
  } catch (e) {
    return Result.Err(e);
  }
};
