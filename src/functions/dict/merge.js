import { create } from "../object/create.js";
import { extend } from "../object/extend.js";

export const merge = (target, ...sources) =>
  extend(create(null), target, ...sources);
