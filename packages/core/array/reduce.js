import { curry } from "../lambda/curry.js";

export const reduce = curry((fn, initial, arr) => arr.reduce(fn, initial));
