import { failure } from "./failure.js";
import { length } from "./length.js";

export const last = (list) =>
  length(list) > 0
    ? [...list][length(list) - 1]
    : failure("last requires a list to have at least 1 element");
