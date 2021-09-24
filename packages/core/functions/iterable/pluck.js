import { curry } from "../lambda/curry.js";
import { slice } from "./slice.js";

export const pluck = curry((numItems, iter) => slice(iter, 0, numItems, 1));
