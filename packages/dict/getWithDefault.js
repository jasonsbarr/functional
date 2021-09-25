import { isNullish } from "@jasonsbarr/functional-core/functions/predicates/isNullish.js";
import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";

export const getWithDefault = curry((key, defaultValue, dict) =>
  isNullish(dict[key]) ? defaultValue : dict[key]
);
