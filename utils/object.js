const keys = Object.keys;
const symbols = Object.getOwnPropertySymbols;
const defineProperty = Object.defineProperty;
const property = Object.getOwnPropertyDescriptor;

export const define = (object, name, value) =>
  defineProperty(object, name, {
    value,
    writable: true,
    enumerable: false,
    configurable: true,
  });

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
