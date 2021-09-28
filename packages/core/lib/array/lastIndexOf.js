import { curry } from "../lambda/curry.js";
import { Some, None } from "../types/Option.js";
import { gt } from "../predicates/gt.js";

export const lastIndexOf = curry((value, arr) => {
  const res = arr.lastIndexOf(value);
  return gt(-1, res) ? Some(res) : None(res);
});
