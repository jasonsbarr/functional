import { curry } from "../lambda/curry.js";

export const setProto = curry((source, target) =>
  Object.setPrototypeOf(target, source)
);
