import { curry } from "../lambda/curry.js";

export const split = curry((splitter, str) => str.split(splitter));
