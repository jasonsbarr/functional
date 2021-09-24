import { isIterable } from "../predicates/isIterable.js";
import { reduce } from "../iterable/reduce.js";

// Gets the min of any number of numbers OR 1 or more iterables filled with numbers
export const min = (...args) => {
  if (isIterable(args[0])) {
    return (
      args.reduce((acc, arr) => {
        const m = reduce(
          (acc2, num) => (acc2 < num ? acc2 : num),
          Infinity,
          arr
        );
        return m < acc ? m : acc;
      }),
      Infinity
    );
  }
  return Math.max(...args);
};
