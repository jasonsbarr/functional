import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { indexOf } from "./indexOf.js";

// curried version of lastIndexOf
export const lastIndexOfC = curry((value, startIndex, iter) =>
  indexOf((iter, value, startIndex))
);
