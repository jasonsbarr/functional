import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { slice } from "./slice.js";

export const to = curry((index, iter) => slice(iter, 0, index, 1));
