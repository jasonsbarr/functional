import { curry } from "../lambda/curry.js";
import { strIndexOf } from "./strIndexOf.js";

export const strIndexOfFromStart = curry((search, str) =>
  strIndexOf(search, 0, str)
);
