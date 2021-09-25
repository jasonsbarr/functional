import { curry } from "../lambda/curry.js";

export const splice = curry((start, deleteCount, item, arr) =>
  arr.splice(start, deleteCount, item)
);
