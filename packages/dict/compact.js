import { create } from "@jasonsbarr/functional-core/functions/object/create.js";
import { entries } from "@jasonsbarr/functional-core/functions/object/entries.js";
import { isNil } from "@jasonsbarr/functional-core/functions/predicates/isNil.js";

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
