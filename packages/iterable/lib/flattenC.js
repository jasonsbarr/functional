import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { flatten } from "./flatten.js";

// curried version of flatten
export const flattenC = curry((level, iter) => flatten(iter, level, 0));
