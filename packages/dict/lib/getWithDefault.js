import { isNullish } from "@jasonsbarr/functional-core/predicates/isNullish.js";
import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";

export const getWithDefault = curry((key, defaultValue, dict) =>
  isNullish(dict[key]) ? defaultValue : dict[key]
);
