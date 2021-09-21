import { curry } from "../lambda/curry.js";

export const match = curry((regex, str) => str.match(regex));
