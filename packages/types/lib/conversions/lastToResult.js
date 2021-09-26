import { Ok, Err } from "@jasonsbarr/functional-core/lib/types/Result.js";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction.js";

export const lastToResult = (last) =>
  isFunction(last.valueOf().isSome) ? Ok(last.valueOf()) : Err(last.valueOf());
