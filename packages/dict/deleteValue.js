import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { copy } from "./copy.js";

export const deleteValue = curry((key, dict) => {
  let c = copy(dict);
  delete c[key];
  return c;
});
