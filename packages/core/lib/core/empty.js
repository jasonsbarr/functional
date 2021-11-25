import { isFunction } from "../predicates/isFunction.js";
import { isArray } from "../predicates/isArray.js";
import { failure } from "./failure.js";

export const empty = (monoid) =>
  isFunction(monoid.empty)
    ? monoid.empty()
    : isArray(monoid)
    ? []
    : monoid.name === "Set"
    ? new Set()
    : monoid.name === "Map"
    ? new Map()
    : failure("Monoids must have an empty method");
