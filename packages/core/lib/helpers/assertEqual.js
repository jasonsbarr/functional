import { curry } from "../lambda/curry.js";
import { equals } from "../object/equals.js";

export const assertEqual = curry((v1, v2, message) => {
  if (equals(v1, v2)) {
    return true;
  }
  throw new Error(message);
});
