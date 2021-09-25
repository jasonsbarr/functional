import { fromEntries } from "@jasonsbarr/functional-core/lib/object/fromEntries.js";
import { slice } from "@jasonsbarr/iterable/lib/slice.js";
import { entries } from "@jasonsbarr/functional-core/lib/object/entries.js";
import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";

export const pluck = curry((numItems, dict) =>
  fromEntries(slice(entries(dict), numItems))
);
