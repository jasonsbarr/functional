import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";

export const prepend = curry((item, iter) => iter.constructor(item, ...iter));
