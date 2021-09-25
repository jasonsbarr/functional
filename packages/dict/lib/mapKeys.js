import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { keys } from "@jasonsbarr/functional-core/lib/object/keys.js";

export const mapKeys = curry((fn, dict) => {
  let d = new Object.create(null);
  for (let key of keys(dict)) {
    d[fn(key)] = dict[key];
  }
  return d;
});
