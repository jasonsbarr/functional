import { curry } from "../lambda/curry";
import { copy } from "./copy";

export const deleteValue = curry((key, hash) => {
  let c = copy(hash);
  delete c[key];
  return c;
});
