import { at } from "./at.js";
import { randInt } from "@jasonsbarr/functional-core/functions/math/randInt.js";
import { length } from "./length.js";

export const sample = (iter) => at(randInt(0, length(iter) - 1), iter);
