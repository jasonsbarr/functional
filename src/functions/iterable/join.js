import { curry } from "../lambda/curry.js";

export const join = curry((sep, iter) => [...iter].join(sep));
