import { curry } from "../lambda/curry.js";

export const test = curry((regexp, str) => regexp.test(str));
