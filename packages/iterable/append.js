import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";

export const append = curry((item, iter) => iter.constructor(...iter, item));
