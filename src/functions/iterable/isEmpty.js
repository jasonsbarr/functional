import { length } from "./length.js";

export const isEmpty = (iter) => {
  return length(iter) === 0;
};
