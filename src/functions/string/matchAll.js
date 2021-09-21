import { curry } from "../lambda/curry.js";

export const matchAll = curry((regex, str) => [...str.matchAll(regex)]);
