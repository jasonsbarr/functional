export const once = (f) => {
  let called, result;

  return (...args) => {
    if (!called) {
      called = true;
      result = f.apply(null, args);
    }
    return result;
  };
};
