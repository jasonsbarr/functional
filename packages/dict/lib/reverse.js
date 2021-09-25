import { entries } from "@jasonsbarr/functional-core/lib/object/entries.js";
import { reverse as reverseA } from "@jasonsbarr/iterable/lib/reverse.js";
import { fromEntries } from "@jasonsbarr/functional-core/lib/object/fromEntries.js";

export const reverse = (dict) => {
  const pairs = entries(dict);
  const reversed = reverseA(pairs);
  return fromEntries(reversed);
};
