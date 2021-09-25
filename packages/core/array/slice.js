import { curry } from "../lambda/curry.js";

export const slice = curry((start, end, arr) => arr.slice(start, end));
