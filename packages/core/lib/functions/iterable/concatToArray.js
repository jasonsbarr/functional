import { reduce } from "./reduce.js";

export const concatToArray = (...iters) =>
  reduce((arr, iter) => arr.concat([...iter]), [], iters);
