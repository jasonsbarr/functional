import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { slice } from "./slice.js";

export const take = curry((numItems, iter) => slice(iter, 0, numItems, 1));
