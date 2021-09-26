import { Right, Left } from "@jasonsbarr/functional-core/lib/types/Either.js";

export const validationToEither = (validation) =>
  validation.isSuccess()
    ? Right(validation.valueOf())
    : Left(validation.messages);
