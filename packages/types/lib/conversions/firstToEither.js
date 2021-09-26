import { Right, Left } from "@jasonsbarr/functional-core/lib/types/Either.js";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction.js";

export const firstToEither = (first) =>
  isFunction(first.valueOf().isSome)
    ? Right(first.valueOf())
    : Left(first.valueOf());
