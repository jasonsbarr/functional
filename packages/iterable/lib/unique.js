import { equals } from "@jasonsbarr/functional-core/lib/object/equals.js";

export const unique = (iter) => {
  let temp = [];

  for (let item of iter) {
    let uniq = true;
    for (let i of temp) {
      if (equals(i, item)) {
        uniq = false;
      }
    }
    if (uniq) {
      temp.push(item);
    }
  }

  return iter.constructor(...temp);
};
