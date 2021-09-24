import { slice as sliceI } from "../iterable/slice.js";

export const slice = (str, start, end, step) =>
  sliceI([...str], start, end, step).join("");
