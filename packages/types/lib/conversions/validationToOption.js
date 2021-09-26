import { Some, None } from "@jasonsbarr/functional-core/lib/types/Option.js";

export const validationToOption = (validation) =>
  validation.isSuccess()
    ? Some(validation.valueOf())
    : None(validation.messages);
