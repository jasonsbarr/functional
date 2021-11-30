import { curry } from "./curry.js";
import { concatValues } from "../helpers/concatValues.js";
import { isFunction } from "../predicates/isFunction.js";

export const concat = curry((sg1, sg2) =>
  isFunction(sg1.concat) && isFunction(sg2.concat)
    ? sg1.concat(sg2)
    : concatValues(sg1, sg2)
);
