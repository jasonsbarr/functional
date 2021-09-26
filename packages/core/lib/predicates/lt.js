import { curry } from "../lambda/curry.js";

export const lt = curry((v2, v1) => v1 < v2);
