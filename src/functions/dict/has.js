import { curry } from "../lambda/curry.js";

export const has = curry((key, hash) => key in hash);