import { at } from "@jasonsbarr/iterable/at.js";
import { length } from "@jasonsbarr/iterable/length.js";
import { values } from "@jasonsbarr/functional-core/object/values.js";

export const last = (dict) => {
  const vs = values(dict);
  return at(length(vs) - 1, vs);
};
