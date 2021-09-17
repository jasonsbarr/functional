import { equals } from "../object/equals.js";

export const none = (search, iter) => {
  for (let item of iter) {
    if (typeof search === "function") {
      if (search(item)) return false;
    } else if (search instanceof RegExp) {
      if (search.test(item)) return false;
    } else {
      if (equals(search, item)) return false;
    }
  }
  return true;
};
