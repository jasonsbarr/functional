import { curry } from "./curry.js";
import { isFunction } from "../predicates/isFunction.js";
import { failure } from "./failure.js";

export const bimap = curry((leftF, rightF, obj) =>
  isFunction(obj.bimap)
    ? obj.bimap(leftF, rightF)
    : failure("Bifunctor must implement bimap method")
);
