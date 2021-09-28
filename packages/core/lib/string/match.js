import { curry } from "../lambda/curry.js";
import { Some, None } from "../types/Option.js";
import { gt } from "../predicates/gt.js";

export const match = curry((regex, str) => {
  const res = str.match(regex);
  return gt(-1, res) ? Some(res) : None(res);
});
