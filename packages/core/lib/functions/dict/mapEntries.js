import { curry } from "../lambda/curry.js";
import { entries } from "../object/entries.js";
import { create } from "../object/create.js";

// fn should take [key, value] pair like that from Object.entries
export const mapEntries = curry((fn, dict) => {
  let d = create(null);
  for (let [key, value] of entries(dict)) {
    const [k, v] = fn(key, value);
    d[k] = v;
  }
  return d;
});