import { curry } from "../lambda/curry.js";
import { reduceRight as reduceRightI } from "../iterable/reduceRight.js";
import { values } from "../object/values.js";

export const reduceRight = curry((fn, initial, dict) =>
  reduceRightI(fn, initial, values(dict))
);
