import { curry } from "../lambda/curry";
import { keys } from "../object/keys";
import { copy } from "./copy";

export const map = curry((fn, hash) => {
  let c = copy(hash);
  for (let key of keys(hash)) {
    c[key] = fn(hash[key]);
  }
  return c;
});
