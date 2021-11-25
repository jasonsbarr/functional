import { curry } from "./curry.js";
import { isFunction } from "../predicates/isFunction.js";
import { isArray } from "../predicates/isArray.js";
import { failure } from "./failure.js";

export const of = curry((app, val) =>
  isFunction(app.of)
    ? app.of(val)
    : isArray(app)
    ? [val]
    : app.name === "Set"
    ? new Set(val)
    : app.name === "Map"
    ? new Map(Object.entries(val))
    : failure("Applicative must have an of method")
);
