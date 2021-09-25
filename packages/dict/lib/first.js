import { values } from "@jasonsbarr/functional-core/lib/object/values.js";
import { at } from "@jasonsbarr/iterable/lib/at.js";

// returns Option
export const first = (dict) => {
  const vs = values(dict);
  return at(0, vs);
};
