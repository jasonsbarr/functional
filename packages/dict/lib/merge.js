import { create } from "@jasonsbarr/functional-core/lib/object/create.js";
import { extend } from "@jasonsbarr/functional-core/lib/object/extend.js";

export const merge = (target, ...sources) =>
  extend(create(null), target, ...sources);
