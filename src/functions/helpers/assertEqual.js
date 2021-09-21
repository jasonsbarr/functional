import { curry } from "../lambda/curry.js";
import { equals } from "../object/equals";

export const assertEqual = curry((v1, v2) => {
  if (equals(v1, v2)) {
    return true;
  }
  throw new Error(
    `Expected value equality, got ${JSON.stringify(
      v1,
      null,
      2
    )} !== ${JSON.stringify(v2, null, 2)}`
  );
});
