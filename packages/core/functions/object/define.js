export const define = (object, name, value) =>
  Object.defineProperty(object, name, {
    value,
    writable: true,
    enumerable: false,
    configurable: true,
  });
