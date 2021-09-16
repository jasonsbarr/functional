import { curry } from "../lambda/curry.js";
import { keys } from "../object/keys.js";
import { copy } from "./copy.js";

export const map = curry((fn, hash) => {
  let c = copy(hash);
  for (let key of keys(hash)) {
    c[key] = fn(hash[key]);
  }
  return c;
});
