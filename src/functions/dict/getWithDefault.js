import { isNullish } from "../predicates/isNullish.js";
import { curry } from "../lambda/curry.js";

export const getWithDefault = curry((key, defaultValue, dict) =>
  isNullish(dict[key]) ? defaultValue : dict[key]
);
