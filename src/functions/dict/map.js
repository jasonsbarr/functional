import { curry } from "../lambda/curry.js";
import { keys } from "../object/keys.js";
import { copy } from "./copy.js";

export const map = curry((fn, dict) => {
  let c = copy(dict);
  for (let key of keys(dict)) {
    c[key] = fn(dict[key]);
  }
  return c;
});
