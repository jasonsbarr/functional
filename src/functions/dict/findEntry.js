import { None, Some } from "../../types/Option.js";
import { curry } from "../lambda/curry.js";
import { entries } from "../object/entries.js";

export const findEntry = curry((pred, dict) => {
  for (let [k, v] of entries(dict)) {
    if (pred(v)) {
      return Some([k, v]);
    }
  }
  return None();
});
