import { curry } from "../lambda/curry.js";

export const ifElse = curry((pred, ifCase, elseCase, value) =>
  pred(value) ? ifCase(value) : elseCase(value)
);
