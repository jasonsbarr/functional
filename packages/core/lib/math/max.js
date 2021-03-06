import { isIterable } from "../predicates/isIterable.js";
import { reduce } from "@jasonsbarr/iterable/lib/reduce.js";

// Gets the max of any number of numbers OR 1 or more iterables filled with numbers
export const max = (...args) => {
  if (isIterable(args[0])) {
    return (
      args.reduce((acc, iter) => {
        const m = reduce(
          (acc2, num) => (acc2 > num ? acc2 : num),
          -Infinity,
          iter
        );
        return m > acc ? m : acc;
      }),
      -Infinity
    );
  }
  return Math.max(...args);
};
