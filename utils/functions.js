export const identity = (x) => x;

export const noop = () => {};

export const unit = () => null;

export const pipeline = (val, ...fns) => fns.reduce((v, fn) => fn(v), val);

export const pipe =
  (...fns) =>
  (val) =>
    pipeline(val, ...fns);

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

export const defer =
  typeof setImmediate !== "undefined"
    ? (f) => setImmediate(f)
    : typeof process !== "undefined"
    ? (f) => process.nextTick(f)
    : (f) => setTimeout(f, 0);
