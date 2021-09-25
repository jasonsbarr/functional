import { curry } from "../lambda/curry.js";

export const flip = curry((fn, x, y) => fn(y, x));
