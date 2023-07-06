import { definePropWithOpts } from "./definePropWithOpts.js";

export const defineMeta = (prop, obj, value) =>
  definePropWithOpts(prop, obj, {
    writable: false,
    enumerable: false,
    configurable: false,
    value,
  });
