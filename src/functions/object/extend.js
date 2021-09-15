import { keys } from "./keys.js";
import { property } from "./property.js";
import { symbols } from "./symbols";

export const extend = (target, ...sources) => {
  sources.forEach((source) => {
    keys(source).forEach((key) => {
      if (key === "prototype") {
        target[key] = source[key];
      } else {
        defineProperty(target, key, property(source, key));
      }
    });
    symbols(source).forEach((symbol) => {
      defineProperty(target, symbol, property(source, symbol));
    });
  });
  return target;
};
