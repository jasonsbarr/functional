import { fromEntries } from "../object/fromEntries.js";
import { slice } from "../iterable/slice.js";
import { entries } from "../object/entries.js";
import { curry } from "../lambda/curry.js";

export const pluck = curry((numItems, dict) =>
  fromEntries(slice(entries(dict), numItems))
);
