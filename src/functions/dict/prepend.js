import { curry } from "../lambda/curry.js";
import { entries } from "../object/entries.js";
import { fromEntries } from "../object/fromEntries.js";
import { isArray } from "../predicates/isArray.js";
import { isMap } from "../predicates/isMap.js";
import { isObject } from "../predicates/isObject.js";

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
