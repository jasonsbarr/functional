import { curry } from "../lambda/curry.js";

export const and = curry((arg1, arg2) => arg1 && arg2);
