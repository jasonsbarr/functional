import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { removeAt } from "./removeAt.js";

// curried version of removeAt
export const removeAtC = curry((start, end, iter) =>
  removeAt(iter, start, end)
);
