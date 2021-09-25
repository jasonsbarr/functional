import { length } from "./length.js";
import { reduce } from "./reduce.js";
import { Some, None } from "@jasonsbarr/functional-core/types/Option.js";

// returns Option
export const min = (iter) =>
  length(iter) === 0
    ? None(null)
    : Some(reduce((small, cur) => (small < cur ? small : cur), Infinity, iter));
