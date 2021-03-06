import { slice } from "./slice.js";
import { length } from "./length.js";
import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";

export const from = curry((i, iter) => slice(iter, i, length(iter) - 1, 1));
