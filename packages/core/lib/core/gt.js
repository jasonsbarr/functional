import { curry } from "./curry.js";
import { lte } from "./lte.js";

export const gt = curry((obj1, obj2) => !lte(obj1, obj2));
