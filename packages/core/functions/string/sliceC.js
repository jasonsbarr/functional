import { curry } from "../lambda/curry.js";
import { slice } from "./slice.js";

export const sliceC = curry((start, stop, end, str) =>
  slice(str, start, stop, end)
);
