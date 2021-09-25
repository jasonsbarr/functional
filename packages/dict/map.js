import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { keys } from "@jasonsbarr/functional-core/functions/object/keys.js";
import { copy } from "./copy.js";

export const map = curry((fn, dict) => {
  let c = copy(dict);
  for (let key of keys(dict)) {
    c[key] = fn(dict[key]);
  }
  return c;
});
