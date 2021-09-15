import { property } from "./property.js";
export const defineProperty = (target, symbol, source) =>
  Object.defineProperty(target, symbol, property(source, symbol));
