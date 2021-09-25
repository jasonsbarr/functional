import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { at } from "./at.js";

export const atWithDefault = curry((i, defaultValue, iter) =>
  at(i, iter).fold(
    () => defaultValue,
    (x) => x
  )
);
