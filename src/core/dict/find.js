import { None, Some } from "../../types/Option.js";
import { curry } from "../lambda/curry.js";
import { entries } from "../object/entries.js";

export const find = curry((pred, dict) => {
  for (let [_, v] of entries(dict)) {
    if (pred(v)) {
      return Some(v);
    }
  }
  return None(null);
});
