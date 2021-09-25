import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";

export const prepend = curry((item, iter) => iter.constructor(item, ...iter));
