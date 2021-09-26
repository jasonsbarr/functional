import { curry } from "../lambda/curry.js";
import { length } from "./length.js";
import { substring } from "./substring.js";

export const from = curry((start, str) => substring(start, length(str), str));
