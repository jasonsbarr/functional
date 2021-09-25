import { create } from "@jasonsbarr/functional-core/object/create.js";
import { entries } from "@jasonsbarr/functional-core/object/entries.js";
import { isNil } from "@jasonsbarr/functional-core/predicates/isNil.js";

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
