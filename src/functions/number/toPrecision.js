import { curry } from "../lambda/curry.js";

export const toPrecision = curry((precis, num) =>
  Number.parseFloat(num).toPrecision(precis)
);
