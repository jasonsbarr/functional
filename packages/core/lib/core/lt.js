import { curry } from "./curry.js";
import { gte } from "./gte.js";

export const lt = curry((obj1, obj2) => !gte(obj1, obj2));
