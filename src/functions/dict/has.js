import { curry } from "../lambda/curry.js";

export const has = curry((key, dict) => key in dict);
