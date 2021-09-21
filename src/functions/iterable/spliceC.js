import { curry } from "../lambda/curry.js";
import { splice } from "./splice.js";

// curried splice
// can only take one item to splice into the iterable
export const spliceC = curry((start, deleteCount, item, iter) =>
  splice(iter, start, deleteCount, item)
);
