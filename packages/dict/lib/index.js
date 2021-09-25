import { None, Some } from "@jasonsbarr/functional-core/types/Option.js";
import { entries } from "@jasonsbarr/iterable/entries.js";
import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { equals } from "@jasonsbarr/functional-core/object/equals.js";

// returns Option
export const index = curry((value, dict) => {
  for (let [k, v] of entries(dict)) {
    if (equals(value, v)) {
      return Some(k);
    }
  }
  return None(null);
});
