import { extend } from "../object/extend.js";

export const merge = (target, ...sources) =>
  extend(Object.create(null), target, ...sources);
