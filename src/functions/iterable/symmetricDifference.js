import { curry } from "../lambda/curry.js";

export const symmetricDifference = curry((iter1, iter2) => {
  let set1 = new Set([...iter1]);
  let set2 = new Set([...iter2]);
  for (let item of set2) {
    if (set1.has(item)) {
      set1.delete(item);
    } else {
      set1.add(item);
    }
  }
  return iter1.constructor(...set1);
});
