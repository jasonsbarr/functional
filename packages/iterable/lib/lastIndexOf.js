import { length } from "./length.js";
import { equals } from "@jasonsbarr/functional-core/lib/object/equals.js";
import { Some, None } from "@jasonsbarr/functional-core/lib/types/Option.js";

// returns Option, data-first because of optional argument
export const lastIndexOf = (iter, value, startIndex = length(iter) - 1) => {
  const temp = [...iter];
  for (let i = startIndex; i >= 0; i--) {
    if (equals(temp[i], value)) {
      return Some(i);
    }
  }
  return None(null);
};
