import { curry } from "../lambda/curry.js";

export const flatN = curry((depth, arr) => arr.flat(depth));
