import { entries } from "../object/entries.js";
import { isNumber } from "../predicates/isNumber.js";
import { isFunction } from "../predicates/isFunction.js";
import { isString } from "../predicates/isString.js";
import { localeCompare } from "../string/localeCompare.js";
import { fromEntries } from "../object/fromEntries.js";
import { isBool } from "../predicates/isBool.js";
import { reverse as reverseI } from "../iterable/reverse.js";

export const sort = (dict, { key = "", fn = null, reverse = false } = {}) => {
  let es = entries(dict);
  const firstValue = es[0][1];

  if (isFunction(fn)) {
    es.sort((a, b) => fn(a[1], b[1]));
  } else if (isNumber(firstValue)) {
    es.sort((a, b) => a[1] - b[1]);
  } else if (isString(firstValue)) {
    es.sort((a, b) => localeCompare(b[1], a[1]));
  } else if (isBool(firstValue)) {
    es.sort((a, b) => b[1] - a[1]);
  } else if (key) {
    const checker = es[0][1][key];
    if (isNumber(checker)) {
      es.sort((a, b) => a[1][key] - b[1][key]);
    } else if (isString(checker)) {
      es.sort((a, b) => localeCompare(b[1][key], a[1][key]));
    } else if (isBool(checker)) {
      es.sort((a, b) => b[1][key] - a[1][key]);
    }
  }
  return fromEntries(reverse ? reverseI(es) : es);
};
