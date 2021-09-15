export const thunk = (fn) => {
  let value;
  let computed = false;

  return () => {
    if (computed) {
      return value;
    }
    computed = true;
    value = fn();
    return value;
  };
};
