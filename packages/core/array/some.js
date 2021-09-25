import { curry } from "../lambda/curry.js";

export const some = curry((pred, arr) => arr.some(pred));
