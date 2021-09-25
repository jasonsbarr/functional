import { entries } from "@jasonsbarr/functional-core/functions/object/entries.js";
import { isNumber } from "@jasonsbarr/functional-core/functions/predicates/isNumber.js";
import { isFunction } from "@jasonsbarr/functional-core/functions/predicates/isFunction.js";
import { isString } from "@jasonsbarr/functional-core/functions/predicates/isString.js";
import { localeCompare } from "@jasonsbarr/functional-core/functions/string/localeCompare.js";
import { fromEntries } from "@jasonsbarr/functional-core/functions/object/fromEntries.js";
import { isBool } from "@jasonsbarr/functional-core/functions/predicates/isBool.js";
import { reverse as reverseI } from "@jasonsbarr/iterable/reverse.js";

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
