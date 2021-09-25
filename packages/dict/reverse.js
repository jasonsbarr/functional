import { entries } from "@jasonsbarr/functional-core/object/entries.js";
import { reverse as reverseA } from "@jasonsbarr/iterable/reverse.js";
import { fromEntries } from "@jasonsbarr/functional-core/object/fromEntries.js";

export const reverse = (dict) => {
  const pairs = entries(dict);
  const reversed = reverseA(pairs);
  return fromEntries(reversed);
};
