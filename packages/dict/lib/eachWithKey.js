import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { keys } from "@jasonsbarr/functional-core/lib/object/keys.js";

export const eachWithKey = curry((fn, dict) => {
  for (let key of keys(dict)) {
    fn(dict[key], value);
  }
});
