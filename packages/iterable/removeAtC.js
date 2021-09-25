import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { removeAt } from "./removeAt.js";

// curried version of removeAt
export const removeAtC = curry((start, end, iter) =>
  removeAt(iter, start, end)
);
