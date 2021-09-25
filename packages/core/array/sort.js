import { isNumber } from "../predicates/isNumber.js";

export const sort = (arr) =>
  isNumber(arr[0]) ? [...arr].sort((a, b) => a - b) : [...arr].sort();
