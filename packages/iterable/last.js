import { at } from "./at.js";
import { length } from "./length.js";

// returns option
export const last = (iter) => at(length(iter) - 1, iter);
