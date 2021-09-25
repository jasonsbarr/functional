import { None, Some } from "@jasonsbarr/functional-core/lib/types/Option.js";
import { entries } from "@jasonsbarr/iterable/lib/entries.js";
import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { equals } from "@jasonsbarr/functional-core/lib/object/equals.js";

// returns Option
export const index = curry((value, dict) => {
  for (let [k, v] of entries(dict)) {
    if (equals(value, v)) {
      return Some(k);
    }
  }
  return None(null);
});
