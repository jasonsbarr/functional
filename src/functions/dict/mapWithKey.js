import { curry } from "../lambda/curry";
import { keys } from "../object/keys";

export const mapWithKey = curry((fn, hash) => {
  let copy = Object.create(null);
  for (let key of keys(hash)) {
    copy[key] = fn(hash[key], key);
  }
  return copy;
});
