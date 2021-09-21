import { property } from "./property.js";
export const defineProperty = (target, key, source) =>
  Object.defineProperty(target, key, property(source, key));
