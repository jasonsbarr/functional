import { isIterable } from "../predicates/isIterable.js";
import { isString } from "../predicates/isString.js";

// Returns a single array of the function args based on whether the first arg is an iterable
export const getArrayFromArgs = (...args) =>
  isIterable(args[0]) && !isString(args[0]) ? [...args[0]] : args;
