import { curry } from "../lambda/curry.js";

export const copyProto = curry((source, target) =>
  Object.setPrototypeOf(target, source.__proto__)
);
