import { curry } from "../lambda/curry.js";

export const prepend = curry((item, iter) => iter.constructor(item, ...iter));
