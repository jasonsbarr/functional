import { curry } from "../lambda/curry.js";

export const repeat = curry((num, str) => str.repeat(num));
