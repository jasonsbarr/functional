import { length } from "./length.js";
import { splice } from "./splice.js";

export const removeAt = (iter, start, end = length(iter) - 1) => {
  if (end > length(iter) - 1) end = length(iter) - 1;
  return splice(iter, start, end - start);
};
