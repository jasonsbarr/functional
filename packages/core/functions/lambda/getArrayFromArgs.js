import { isIterable } from "../predicates/isIterable.js";

// Returns a single array of the function args based on whether the first arg is an iterable
export const getArrayFromArgs = (...args) =>
  isIterable(args[0]) && typeof args[0] !== "string" ? [...args[0]] : args;
