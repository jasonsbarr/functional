import { curry } from "../lambda/curry.js";

export const sortBy = curry((fn, arr) => [...arr].sort(fn));
