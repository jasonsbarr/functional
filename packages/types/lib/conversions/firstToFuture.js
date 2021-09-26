import { Future } from "@jasonsbarr/functional-core/lib/types/Future.js";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction.js";

export const firstToFuture = (first) =>
  isFunction(first.isSome)
    ? Future.of(first.valueOf())
    : Future.rejected(first.valueOf());
