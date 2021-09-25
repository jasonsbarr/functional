import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { at } from "./at.js";

// unsafe - may return null value
export const atUnsafe = curry((i, iter) =>
  at(i, iter).fold(
    (x) => x,
    (x) => x
  )
);
