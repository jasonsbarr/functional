import { curry } from "../lambda/curry.js";

export const substring = curry((start, end, str) => str.substring(start, end));
