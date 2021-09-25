import { curry } from "../lambda/curry.js";

export const find = curry((pred, arr) => arr.find(pred));
