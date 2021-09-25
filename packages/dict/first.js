import { values } from "@jasonsbarr/functional-core/object/values.js";
import { at } from "@jasonsbarr/iterable/at.js";

// returns Option
export const first = (dict) => {
  const vs = values(dict);
  return at(0, vs);
};
