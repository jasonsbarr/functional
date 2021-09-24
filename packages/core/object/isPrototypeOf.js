import { curry } from "../lambda/curry.js";

export const isPrototypeOf = curry((checker, checked) =>
  checker.isPrototypeOf(checked)
);
