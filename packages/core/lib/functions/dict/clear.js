import { keys } from "../object/keys.js";
import { copy } from "./copy.js";

export const clear = (dict) => {
  let c = copy(dict);
  for (let key of keys(dict)) {
    c[key] = undefined;
  }
  return c;
};
