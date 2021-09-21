import { curry } from "../lambda/curry.js";
import { startsWith } from "./startsWith.js";

export const startsWithFromStart = curry((search, str) =>
  startsWith(search, 0, str)
);
