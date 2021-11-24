import { Future } from "@jasonsbarr/concurrency/lib/Future.js";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction.js";

export const firstToFuture = (first) =>
  isFunction(first.isSome)
    ? Future.of(first.valueOf())
    : Future.rejected(first.valueOf());
