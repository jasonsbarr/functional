import { curry } from "../lambda/curry.js";

export const forEach = curry((fn, arr) => arr.forEach(fn));
