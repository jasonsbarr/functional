import { curry } from "../lambda/curry.js";

export const map = curry((fn, arr) => arr.map(fn));
