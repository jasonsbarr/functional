import { None, Some } from "@jasonsbarr/functional-core/types/Option.js";
import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { entries } from "@jasonsbarr/functional-core/object/entries.js";

export const findEntry = curry((pred, dict) => {
  for (let [k, v] of entries(dict)) {
    if (pred(v, k)) {
      return Some([k, v]);
    }
  }
  return None();
});
