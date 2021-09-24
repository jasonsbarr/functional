import { curry } from "../lambda/curry.js";
import { reject } from "./reject.js";
import { equals } from "../object/equals.js";

export const removeByValue = curry((value, dict) =>
  reject((v, _) => equals(v, value), dict)
);
