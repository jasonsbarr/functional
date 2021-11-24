import { Some, None } from "@jasonsbarr/functional-core/lib/types/Option.js";

export const validationToOption = (validation) =>
  validation.fold(
    () => None(),
    (value) => Some(value)
  );
