import { curryN } from "../lambda/curryN.js";

export const ifElse = curryN(3, (pred, ifCase, elseCase, value) =>
  pred(value) ? ifCase : elseCase
);
