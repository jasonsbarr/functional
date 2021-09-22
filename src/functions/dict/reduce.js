import { curry } from "../lambda/curry.js";
import { values } from "../object/values.js";
import { reduce as reduceI } from "../iterable/reduce.js";

export const reduce = curry((fn, initial, dict) =>
  reduceI(fn, initial, values(dict))
);
