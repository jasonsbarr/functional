import { curry } from "../lambda/curry.js";
import { create } from "../object/create.js";
import { entries } from "../object/entries.js";

export const filter = curry((pred, dict) => {
  let results = create(null);
  for (let [k, v] of entries(dict)) {
    if (pred(v)) {
      results[k] = v;
    }
  }
  return results;
});
