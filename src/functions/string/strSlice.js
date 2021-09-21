import { slice } from "../iterable/slice.js";

export const strSlice = (str, start, end, step) =>
  slice([...str], start, end, step).join("");
