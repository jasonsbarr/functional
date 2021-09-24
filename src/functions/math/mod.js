import { applyToAll } from "../lambda/applyToAll.js";
import { curryN } from "../lambda/curryN.js";
import { eq } from "../predicates/eq.js";

export const mod = curryN(
  2,
  applyToAll((dividend, divisor) => {
    if (eq(divisor, 0)) {
      throw new Error("Cannot divide by 0");
    }
    return dividend / divisor;
  })
);
