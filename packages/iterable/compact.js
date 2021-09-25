import { reject } from "./reject.js";
import { isNil } from "@jasonsbarr/functional-core/predicates/isNil.js";

export const compact = (iter) =>
  reject((item) => isNil(item) || Number.isNaN(item), iter);
