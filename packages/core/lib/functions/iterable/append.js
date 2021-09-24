import { curry } from "../lambda/curry.js";

export const append = curry((item, iter) => iter.constructor(...iter, item));
