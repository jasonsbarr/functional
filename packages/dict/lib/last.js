import { at } from "@jasonsbarr/iterable/lib/at.js";
import { length } from "@jasonsbarr/iterable/lib/length.js";
import { values } from "@jasonsbarr/functional-core/lib/object/values.js";

export const last = (dict) => {
  const vs = values(dict);
  return at(length(vs) - 1, vs);
};
