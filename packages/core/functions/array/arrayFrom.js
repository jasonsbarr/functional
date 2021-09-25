import { curry } from "../lambda/curry.js";

export const arrayFrom = curry((mapFn, iter) => Array.from(iter, mapFn));
