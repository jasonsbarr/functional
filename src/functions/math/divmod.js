import { curry } from "../lambda/curry.js";
import { eq } from "../predicates/eq.js";

export const divmod = curry((dividend, divisor) => {
  if (eq(divisor, 0)) {
    throw new Error("Cannot divide by 0");
  }
  return [dividend / divisor, dividend % divisor];
});
