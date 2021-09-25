import { curry } from "../lambda/curry.js";

export const join = curry((sep, arr) => arr.join(sep));
