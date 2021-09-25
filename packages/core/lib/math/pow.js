import { curry } from "../lambda/curry.js";

export const pow = curry((base, exp) => Math.pow(base, exp));
