import { curry } from "../lambda/curry.js";
import { entries } from "../object/entries.js";
import { fromEntries } from "../object/fromEntries.js";
import { isArray } from "../predicates/isArray.js";
import { isMap } from "../predicates/isMap.js";
import { isObject } from "../predicates/isObject.js";

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
