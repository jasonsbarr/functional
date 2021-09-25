import { curry } from "../lambda/curry.js";

export const lastIndexOf = curry((value, arr) => arr.lastIndexOf(value));
