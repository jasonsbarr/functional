import { curry } from "../lambda/curry.js";
import { splice } from "./splice.js";

export const insert = curry((item, i, iter) => splice(iter, i, 0, item));
