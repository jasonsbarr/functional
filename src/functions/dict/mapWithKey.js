import { curry } from "../lambda/curry.js";
import { keys } from "../object/keys.js";
import { copy } from "./copy.js";

export const mapWithKey = curry((fn, dict) => {
  let c = copy(dict);
  for (let key of keys(dict)) {
    c[key] = fn(key, dict[key]);
  }
  return c;
});
