import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { copy } from "./copy.js";

export const update = curry((key, updater, dict) => {
  let c = copy(dict);
  c[key] = updater(dict[key]);
  return c;
});
