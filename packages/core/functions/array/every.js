import { curry } from "../lambda/curry.js";

export const every = curry((pred, arr) => arr.every(pred));
