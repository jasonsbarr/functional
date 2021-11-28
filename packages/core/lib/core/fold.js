import { isFunction } from "../predicates/isFunction.js";
import { failure } from "./failure.js";
import { last } from "./last.js";

export const fold = (...args) => {
  if (args.length >= 2) {
    const obj = last(args);
    const funcs = args.slice(0, -1);

    if (isFunction(obj.fold)) {
      return obj.fold(...funcs);
    }

    return failure("Value must have a fold method to use with fold function");
  }

  return failure(
    "Fold function must take at least a reducer and value to fold"
  );
};
