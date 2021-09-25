import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { copy } from "./copy.js";

export const set = curry((key, value, dict) => {
  let c = copy(dict);
  c[key] = value;
  return c;
});
