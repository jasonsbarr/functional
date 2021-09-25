import { at } from "@jasonsbarr/functional-core/functions/iterable/at.js";
import { length } from "@jasonsbarr/functional-core/functions/iterable/length.js";
import { values } from "@jasonsbarr/functional-core/functions/object/values.js";

export const last = (dict) => {
  const vs = values(dict);
  return at(length(vs) - 1, vs);
};
