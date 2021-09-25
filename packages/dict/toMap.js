import { keys } from "@jasonsbarr/functional-core/functions/object/keys.js";
import { symbols } from "@jasonsbarr/functional-core/functions/object/symbols.js";

export const toMap = (dict) => {
  let m = new Map();
  for (let key of keys(dict)) {
    m.set(key, dict[key]);
  }
  for (let key of symbols(dict)) {
    m.set(key, dict[key]);
  }
  return m;
};
