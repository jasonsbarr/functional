import { length } from "./length.js";
import { reduce } from "./reduce.js";
import { Some, None } from "@jasonsbarr/functional-core/lib/types/Option.js";

// returns Option
export const average = (iter) =>
  length(iter) === 0
    ? None(null)
    : Some(reduce((sum, i) => sum + i, 0, iter) / length(iter));
