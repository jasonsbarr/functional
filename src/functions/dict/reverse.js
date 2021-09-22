import { entries } from "../object/entries.js";
import { reverse as reverseA } from "../iterable/reverse.js";
import { fromEntries } from "../object/fromEntries.js";

export const reverse = (dict) => {
  const pairs = entries(dict);
  const reversed = reverseA(pairs);
  return fromEntries(reversed);
};
