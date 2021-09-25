import { curry } from "../lambda/curry.js";

export const indexOf = curry((value, arr) => arr.indexOf(value));
