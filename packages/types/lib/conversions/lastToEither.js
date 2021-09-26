import { Right, Left } from "@jasonsbarr/functional-core/lib/types/Either.js";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction.js";

export const lastToEither = (last) =>
  isFunction(last.valueOf().isSome)
    ? Right(last.valueOf())
    : Left(last.valueOf());
