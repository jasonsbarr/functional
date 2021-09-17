import { at } from "./at.js";

// returns option
export const last = (iter) => at(length(iter) - 1, iter);
