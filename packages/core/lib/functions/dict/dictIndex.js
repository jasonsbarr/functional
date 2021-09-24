import { None, Some } from "../../types/Option.js";
import { entries } from "../iterable/entries.js";
import { curry } from "../lambda/curry.js";
import { equals } from "../object/equals.js";

// returns Option
export const index = curry((value, dict) => {
  for (let [k, v] of entries(dict)) {
    if (equals(value, v)) {
      return Some(k);
    }
  }
  return None(null);
});
