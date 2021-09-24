import { concatToArray } from "./concatToArray.js";

// assumes all iterables are of the same kind, otherwise will construct an iterable of the same type as the first
export const concat = (...iters) =>
  iters[0].constructor(...concatToArray(...iters));
