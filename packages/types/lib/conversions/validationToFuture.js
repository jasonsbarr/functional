import { Future } from "@jasonsbarr/concurrency/lib/Future.js";

export const validationToFuture = (validation) =>
  validation.fold(
    (value) => Future.rejected(value),
    (value) => Future.of(value)
  );
