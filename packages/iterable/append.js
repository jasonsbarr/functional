import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";

export const append = curry((item, iter) => iter.constructor(...iter, item));
