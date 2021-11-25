import { failure } from "./failure.js";
import { length } from "./length.js";

export const fst = (list) =>
  length(list) > 0
    ? [...list][0]
    : failure("fst requires a list to have at least 1 element");
