import { curry } from "../lambda/curry.js";

export const includes = curry((value, arr) => arr.includes(value));
