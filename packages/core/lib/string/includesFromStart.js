import { curry } from "../lambda/curry.js";
import { includes } from "./includes.js";

export const includesFromStart = curry((search, str) =>
  includes(search, 0, str)
);
