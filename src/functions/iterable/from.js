import { slice } from "./slice.js";

export const from = (i, iter) => slice(iter, i, length(iter) - 1, 1);
