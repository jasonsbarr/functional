import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { entries } from "@jasonsbarr/functional-core/functions/object/entries.js";
import { fromEntries } from "@jasonsbarr/functional-core/functions/object/fromEntries.js";
import { isArray } from "@jasonsbarr/functional-core/functions/predicates/isArray.js";
import { isMap } from "@jasonsbarr/functional-core/functions/functions/predicates/isMap.js";
import { isObject } from "@jasonsbarr/functional-core/functions/predicates/isObject.js";

// item can be a single-item object or map, or an array pair [key, value]
export const append = curry((item, dict) => {
  let es = entries(dict);
  if (isObject(item)) {
    const pair = entries(item)[0];
    es.push(pair);
  } else if (isMap(item)) {
    const pair = [...item.entries()][0];
    es.push(pair);
  } else if (isArray(item)) {
    es.push(item);
  } else {
    throw new Error(
      "Item to append must be a single-key object or Map, or an Array pair [key, value]"
    );
  }
  return fromEntries(es);
});
