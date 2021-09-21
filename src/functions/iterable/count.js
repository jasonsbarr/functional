import { curry } from "../lambda/curry.js";
import { equals } from "../object/equals.js";

export const count = curry((search, iter) => {
  let count = 0;
  for (let item of iter) {
    if (typeof search === "function") {
      count += search(item) ? 1 : 0;
    } else if (search instanceof RegExp) {
      count += search.test(item) ? 1 : 0;
    } else {
      count += equals(item, search) ? 1 : 0;
    }
  }
  return count;
});
