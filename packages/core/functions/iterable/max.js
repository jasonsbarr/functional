import { length } from "./length.js";
import { reduce } from "./reduce.js";
import { Some, None } from "../../types/Option.js";

// returns Option
export const max = (iter) =>
  length(iter) === 0
    ? None(null)
    : Some(reduce((big, cur) => (big > cur ? big : cur), -Infinity, iter));
