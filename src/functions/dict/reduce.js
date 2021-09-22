import { curry } from "../lambda/curry.js";
import { reduce as reduceI } from "../iterable/reduce.js";
import { entries } from "../object/entries.js";

export const reduce = curry((fn, initial, dict) => {
  let acc = initial;
  for (let [k, v] of entries(dict)) {
    acc = fn(acc, v, k);
  }
  return acc;
});
