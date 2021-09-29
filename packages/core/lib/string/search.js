import { curry } from "../lambda/curry.js";
import { gt } from "../predicates/gt.js";
import { Some, None } from "../types/Option.js";

export const search = curry((search, str) => {
  const res = str.search(search);
  return gt(-1, res) ? Some(res) : None(res);
});
