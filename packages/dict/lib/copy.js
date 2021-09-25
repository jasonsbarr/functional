import { create } from "@jasonsbarr/functional-core/object/create.js";
import { keys } from "@jasonsbarr/functional-core/object/keys.js";
import { symbols } from "@jasonsbarr/functional-core/object/symbols.js";

// Makes a shallow copy of a hash object's own keys to a hash object with null prototype.
// If you want prototype properties or a non-null prototype use object/clone.
export const copy = (dict) => {
  let c = create(null);
  for (let key of keys(dict)) {
    c[key] = dict[key];
  }
  for (let key of symbols(dict)) {
    c[key] = dict[key];
  }
  return c;
};
