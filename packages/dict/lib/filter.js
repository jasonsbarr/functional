import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { create } from "@jasonsbarr/functional-core/lib/object/create.js";
import { entries } from "@jasonsbarr/functional-core/lib/object/entries.js";

export const filter = curry((pred, dict) => {
  let results = create(null);
  for (let [k, v] of entries(dict)) {
    if (pred(v, k)) {
      results[k] = v;
    }
  }
  return results;
});
