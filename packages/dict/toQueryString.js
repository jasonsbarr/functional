import { entries } from "@jasonsbarr/functional-core/functions/object/entries.js";
import { lt } from "@jasonsbarr/functional-core/functions/predicates/lt.js";

export const toQueryString = (dict) => {
  let qStr = "";
  let i = 0;
  for (let [k, v] of entries(dict)) {
    qStr += encodeURI(k) + "=" + encodeURI(v);
    if (lt(i, entries(dict).length - 1)) {
      qStr += "&";
    }
    i++;
  }
  return qStr;
};
