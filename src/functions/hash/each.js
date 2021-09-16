import { curry } from "../lambda/curry";
import { keys } from "../object/keys";

export const each = curry((fn, hash) => {
  for (let key of keys(hash)) {
    fn(hash[key]);
  }
});
