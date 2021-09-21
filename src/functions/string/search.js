import { curry } from "../lambda/curry.js";

export const search = curry((search, str) => str.search(search));
