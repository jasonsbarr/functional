import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { indexOf } from "./indexOf.js";

// curried version of indexOf
export const indexOfC = curry((value, start, iter) =>
  indexOf(iter, value, start)
);
