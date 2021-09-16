import { curry } from "../lambda/curry.js";
import { extend } from "../object/extend.js";

export const merge = curry((target, ...sources) =>
  extend(Object.create(null), target, ...sources)
);
