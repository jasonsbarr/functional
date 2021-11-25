import { curry } from "./curry.js";
import { equals } from "./equals.js";
import { gt } from "./gt.js";

export const gte = curry((obj1, obj2) => gt(obj1, obj2) || equals(obj1, obj2));
