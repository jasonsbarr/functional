import { curry } from "../lambda/curry.js";
import { keys } from "../object/keys.js";

export const each = curry((fn, hash) => {
  for (let key of keys(hash)) {
    fn(hash[key]);
  }
});
