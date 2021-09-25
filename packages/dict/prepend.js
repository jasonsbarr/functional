import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { entries } from "@jasonsbarr/functional-core/object/entries.js";
import { fromEntries } from "@jasonsbarr/functional-core/object/fromEntries.js";
import { isArray } from "@jasonsbarr/functional-core/predicates/isArray.js";
import { isMap } from "@jasonsbarr/functional-core/predicates/isMap.js";
import { isObject } from "@jasonsbarr/functional-core/predicates/isObject.js";

export const prepend = curry((item, dict) => {
  let es = entries(dict);
  if (isObject(item)) {
    const pair = entries(item)[0];
    es.unshift(pair);
  } else if (isMap(item)) {
    const pair = [...item.entries()][0];
    es.unshift(pair);
  } else if (isArray(item)) {
    es.unshift(item);
  } else {
    throw new Error(
      "Item to prepend must be a single-key object or Map, or an Array pair [key, value]"
    );
  }
  return fromEntries(es);
});
