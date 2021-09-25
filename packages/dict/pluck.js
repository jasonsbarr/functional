import { fromEntries } from "@jasonsbarr/functional-core/functions/object/fromEntries.js";
import { slice } from "@jasonsbarr/functional-core/functions/iterable/slice.js";
import { entries } from "@jasonsbarr/functional-core/functions/object/entries.js";
import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";

export const pluck = curry((numItems, dict) =>
  fromEntries(slice(entries(dict), numItems))
);
