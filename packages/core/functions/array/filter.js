import { curry } from "../lambda/curry.js";

export const filter = curry((pred, arr) => arr.filter(pred));
