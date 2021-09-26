import { Ok, Err } from "@jasonsbarr/functional-core/lib/types/Result.js";

export const validationToResult = (validation) =>
  validation.isSuccess() ? Ok(validation.valueOf()) : Err(validation.valueOf());
