import { curry } from "./curry.js";
import { isFunction } from "../predicates/isFunction.js";
import { failure } from "./failure.js";

export const bichain = curry((leftF, rightF, obj) =>
  isFunction(obj.bichain)
    ? obj.bichain(leftF, rightF)
    : failure("Bichain value must implement bichain method")
);
