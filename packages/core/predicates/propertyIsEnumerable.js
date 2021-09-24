import { curry } from "../lambda/curry.js";

export const propertyIsEnumerable = curry((prop, obj) =>
  obj.propertyIsEnumerable(prop)
);
