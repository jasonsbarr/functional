import { create } from "../object/create.js";
import { entries } from "../object/entries.js";
import { isNil } from "../predicates/isNil.js";

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
