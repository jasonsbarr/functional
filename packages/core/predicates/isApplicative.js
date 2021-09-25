import { isFunction } from "./isFunction.js";

export const isApplicative = (type) => isFunction(type.of);
