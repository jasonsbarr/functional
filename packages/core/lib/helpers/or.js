import { curry } from "../lambda/curry.js";

export const or = curry((arg1, arg2) => arg1 || arg2);
