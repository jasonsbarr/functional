import { Ok, Err } from "@jasonsbarr/functional-core/lib/types/Result.js";

export const validationToResult = (validation) =>
  validation.fold((value) => Err(value), Ok(value));
