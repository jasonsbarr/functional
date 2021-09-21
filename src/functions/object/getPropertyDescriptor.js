import { curry } from "../lambda/curry.js";

export const getPropertyDescriptor = curry((prop, obj) =>
  Object.getOwnPropertyDescriptor(obj, prop)
);
