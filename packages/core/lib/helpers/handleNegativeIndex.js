import { length as lengthS } from "../string/length.js";
import { length } from "../array/length.js";
import { isString } from "../predicates/isString.js";
import { curry } from "../lambda/curry.js";

export const handleNegativeIndex = curry((index, seq) => {
  let len;
  if (isString(seq)) {
    len = lengthS(seq);
  } else {
    len = length([...seq]);
  }
  return index < 0 ? len - index : index;
});
