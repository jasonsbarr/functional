import { Future } from "@jasonsbarr/concurrency/lib/Future.js";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction.js";

export const lastToFuture = (last) =>
  isFunction(last.isSome)
    ? Future.of(last.valueOf())
    : Future.rejected(last.valueOf());
