export const applyToAll =
  (fn) =>
  (...list) =>
    list.reduce(fn);
