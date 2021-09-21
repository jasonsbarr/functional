import { curry } from "../lambda/curry.js";

export const endsWith = curry((end, str) => str.endsWith(end));
