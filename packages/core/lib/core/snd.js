import { failure } from "./failure.js";
import { length } from "./length.js";

export const snd = (list) =>
  length(list) > 1
    ? [...list][1]
    : failure("snd requires a list to have at least 2 elements");
