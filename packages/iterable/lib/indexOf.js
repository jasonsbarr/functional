import { equals } from "@jasonsbarr/functional-core/lib/object/equals.js";
import { Some, None } from "@jasonsbarr/functional-core/lib/types/Option.js";

// data-first because of optional argument, returns Option, works with any value including objects
export const indexOf = (iter, value, start = 0) => {
  let i = 0;
  for (let item of iter) {
    if (i <= start && equals(item, value)) {
      return Some(i);
    }
    i++;
  }
  return None(null);
};
