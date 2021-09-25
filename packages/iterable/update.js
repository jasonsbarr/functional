import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { splice } from "./splice.js";
import { get } from "./get.js";

// updater should take an Option
export const update = curry((updater, i, iter) =>
  splice(iter, i, 1, updater(get(i, iter)))
);
