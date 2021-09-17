import { slice } from "./slice.js";
import { length } from "./length.js";

export const from = (i, iter) => slice(iter, i, length(iter) - 1, 1);
