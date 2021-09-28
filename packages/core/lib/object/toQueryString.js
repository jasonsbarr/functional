import { entries } from "./entries.js";
import { lt } from "../predicates/lt.js";
import { length } from "../array/length.js";

export const toQueryString = (dict) => {
  let qStr = "";
  let i = 0;
  for (let [k, v] of entries(dict)) {
    qStr += encodeURI(k) + "=" + encodeURI(v);
    if (lt(i, length(entries(dict)) - 1)) {
      qStr += "&";
    }
    i++;
  }
  return qStr;
};
