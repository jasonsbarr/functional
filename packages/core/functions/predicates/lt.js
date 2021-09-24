import { curry } from "../lambda/curry.js";

export const lt = curry((v1, v2) => v1 < v2);
