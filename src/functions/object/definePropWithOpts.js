export const definePropWithOpts = (
  prop,
  obj,
  { writable = true, configurable = true, enumerable = true, value = null } = {}
) =>
  Object.defineProperty(obj, prop, {
    writable,
    configurable,
    enumerable,
    value,
  });
