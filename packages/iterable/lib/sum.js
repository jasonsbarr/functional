import { length } from "./length.js";
import { reduce } from "./reduce.js";
import { Some, None } from "@jasonsbarr/functional-core/types/Option.js";

export const sum = (iter) =>
  length(iter) === 0 ? None(null) : Some(reduce((s, c) => s + c, 0, iter));
