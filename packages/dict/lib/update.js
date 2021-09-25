import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { copy } from "./copy.js";

export const update = curry((key, updater, dict) => {
  let c = copy(dict);
  c[key] = updater(dict[key]);
  return c;
});
