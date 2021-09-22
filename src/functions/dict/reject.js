import { curry } from "../lambda/curry.js";
import { create } from "../object/create.js";
import { entries } from "../object/entries.js";

export const reject = curry((pred, dict) => {
  let result = create(null);
  for (let [k, v] of entries(dict)) {
    if (!pred(v)) {
      result[k] = v;
    }
  }
  return result;
});
