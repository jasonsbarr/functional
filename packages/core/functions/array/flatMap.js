import { curry } from "../lambda/curry.js";

export const flatMap = curry((fn, arr) => arr.flatMap(fn));
