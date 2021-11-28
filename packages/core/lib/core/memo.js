export const memo = (fn) => {
  const cache = {};

  return (...args) => {
    const argsKey = JSON.stringify(args);

    if (!cache[argsKey]) {
      cache[argsKey] = fn(...args);
    }

    return cache[argsKey];
  };
};
