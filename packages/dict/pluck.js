import { fromEntries } from "@jasonsbarr/functional-core/object/fromEntries.js";
import { slice } from "@jasonsbarr/iterable/slice.js";
import { entries } from "@jasonsbarr/functional-core/object/entries.js";
import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";

export const pluck = curry((numItems, dict) =>
  fromEntries(slice(entries(dict), numItems))
);
