import { Right, Left } from "@jasonsbarr/functional-core/lib/types/Either.js";

export const validationToEither = (validation) =>
  validation.fold(
    (value) => Left(value),
    (value) => Right(value)
  );
