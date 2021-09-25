import { create } from "@jasonsbarr/functional-core/functions/object/create.js";
import { extend } from "@jasonsbarr/functional-core/functions/object/extend.js";

export const merge = (target, ...sources) =>
  extend(create(null), target, ...sources);
