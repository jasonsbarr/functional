import { curry } from "../lambda/curry.js";
import { copy } from "./copy.js";

export const deleteValue = curry((key, hash) => {
  let c = copy(hash);
  delete c[key];
  return c;
});
