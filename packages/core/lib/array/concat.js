import { curryN } from "../lambda/curryN.js";
import { slice } from "./slice.js";
import { length } from "./length.js";

export const concat = curryN(2, (...args) =>
  args[0].concat(slice(1, length(args), args))
);
