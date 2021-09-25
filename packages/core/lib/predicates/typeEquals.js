import { curry } from "../lambda/curry.js";

export const typeEquals = curry(
  (type, instance) => instance && instance.type === type
);
