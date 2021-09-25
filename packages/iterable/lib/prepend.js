import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";

export const prepend = curry((item, iter) => iter.constructor(item, ...iter));
