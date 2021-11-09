import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { unique } from "./unique.js";
import { includes } from "./includes.js";
import { remove } from "./remove.js";
import { append } from "./append.js";

export const symmetricDifference = curry((iter1, iter2) => {
  let set1 = unique(iter1);
  let set2 = unique(iter2);

  for (let item of set2) {
    if (includes(item, set1)) {
      set1 = remove(item, set1);
    } else {
      set1 = append(item, set1);
    }
  }

  return unique(set1);
});
