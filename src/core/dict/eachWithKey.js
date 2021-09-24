import { curry } from "../lambda/curry.js";
import { keys } from "../object/keys.js";

export const eachWithKey = curry((fn, dict) => {
  for (let key of keys(dict)) {
    fn(key, dict[key]);
  }
});
