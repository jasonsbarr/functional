import { isFunction } from "./isFunction.js";

export const isMonoid = (type) => isFunction(type.empty);
