import { curry } from "@jasonsbarr/functional-core";
import { append } from "./append.js";
import { atUnsafe } from "./atUnsafe.js";
import { length } from "./length.js";

export const takeWhile = curry((pred, iter) => {
  let result = iter.constructor(...[]);
  let i = 0;
  let value = atUnsafe(i, iter);

  while (pred(value) && i < length(iter)) {
    result = append(value, result);
    i++;
    value = atUnsafe(i, iter);
  }

  return result;
});
