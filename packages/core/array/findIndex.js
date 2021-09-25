import { curry } from "../lambda/curry.js";

export const findIndex = curry((pred, arr) => arr.findIndex(pred));
