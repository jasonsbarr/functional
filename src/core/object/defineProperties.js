import { curry } from "../lambda/curry.js";

export const defineProperties = curry((properties, target) =>
  Object.defineProperties(target, properties)
);
