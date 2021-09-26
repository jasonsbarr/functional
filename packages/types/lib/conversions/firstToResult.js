import { Ok, Err } from "@jasonsbarr/functional-core/lib/types/Result.js";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction.js";

export const firstToResult = (first) =>
  isFunction(first.valueOf().isSome)
    ? Ok(first.valueOf())
    : Err(first.valueOf());
