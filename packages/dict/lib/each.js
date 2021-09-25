import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { keys } from "@jasonsbarr/functional-core/object/keys.js";

export const each = curry((fn, dict) => {
  for (let key of keys(dict)) {
    fn(hash[key]);
  }
});
