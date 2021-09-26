import { Future } from "@jasonsbarr/functional-core/lib/types/Future.js";

export const validationToFuture = (validation) =>
  validation.isSuccess()
    ? Future.of(validation.valueOf())
    : Future.rejected(validation.valueOf());
