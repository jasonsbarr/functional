import { applyToAll } from "../lambda/applyToAll.js";
import { curryN } from "../lambda/curryN.js";

export const sub = curryN(
  2,
  applyToAll((a, b) => a - b)
);
