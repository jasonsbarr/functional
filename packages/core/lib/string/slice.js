import { curry } from "../lambda/curry.js";

export const slice = curry((start, end, string) => string.slice(start, end));
