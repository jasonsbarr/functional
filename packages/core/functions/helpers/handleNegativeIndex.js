import { length as lengthS } from "../string/length.js";
import { length } from "../iterable/length.js";

export const handleNegativeIndex = (index, seq) => {
  let len;
  if (typeof seq === "string") {
    len = lengthS(seq);
  } else {
    len = length(seq);
  }
  return index < 0 ? len - index : index;
};
