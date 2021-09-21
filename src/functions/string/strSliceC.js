import { curry } from "../lambda/curry.js";
import { strSlice } from "./strSlice.js";

export const strSliceC = curry((start, stop, end, str) =>
  strSlice(str, start, stop, end)
);
