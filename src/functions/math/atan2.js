import { curry } from "../lambda/curry.js";

export const atan2 = curry((x, y) => Math.atan2(y, x));
