import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { copyWithin } from "./copyWithin.js";

// curried version of copyWithin
export const copyWithinC = curry((target, start, end, iter) =>
  copyWithin(iter, target, start, end)
);
