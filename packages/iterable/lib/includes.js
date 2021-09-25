import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { equals } from "@jasonsbarr/functional-core/object/equals.js";
import { isFunction } from "@jasonsbarr/functional-core/predicates/isFunction.js";
import { isRegExp } from "@jasonsbarr/functional-core/predicates/isRegExp.js";

// works with any value, including objects
export const includes = curry((search, iter) => {
  for (let item of iter) {
    if (isFunction(search)) {
      if (search(item)) return true;
    } else if (isRegExp(search)) {
      if (search.test(item)) return true;
    } else {
      if (equals(item, search)) return true;
    }
  }
  return false;
});
