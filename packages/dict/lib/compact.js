import { create } from "@jasonsbarr/functional-core/lib/object/create.js";
import { entries } from "@jasonsbarr/functional-core/lib/object/entries.js";
import { isNil } from "@jasonsbarr/functional-core/lib/predicates/isNil.js";

export const compact = (dict) => {
  let es = entries(dict);
  let result = create(null);
  for (let [k, v] of es) {
    if (!isNil(v)) {
      result[k] = v;
    }
  }
  return result;
};
