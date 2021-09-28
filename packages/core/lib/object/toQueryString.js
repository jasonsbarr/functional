import { entries } from "./entries.js";
import { lt } from "../predicates/lt.js";
import { length } from "../array/length.js";

export const toQueryString = (obj) => {
  let qStr = "";
  let i = 0;
  for (let [k, v] of entries(obj)) {
    qStr += encodeURI(k) + "=" + encodeURI(v);
    if (lt(i, length(entries(obj)) - 1)) {
      qStr += "&";
    }
    i++;
  }
  return qStr;
};
