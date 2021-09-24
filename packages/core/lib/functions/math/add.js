import { curryN } from "../lambda/curryN.js";
import { applyToAll } from "../lambda/applyToAll.js";

export const add = curryN(
  2,
  applyToAll((a, b) => a + b)
);
