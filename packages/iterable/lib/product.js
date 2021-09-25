import { length } from "./length.js";
import { reduce } from "./reduce.js";
import { Some, None } from "@jasonsbarr/functional-core/lib/types/Option.js";

// returns Option
export const product = (iter) =>
  length(iter) === 0
    ? None(null)
    : Some(reduce((prod, cur) => prod * cur, 1, iter));
