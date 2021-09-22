export const Any = (x) => ({
  kind: "Any",
  value: x,
  concat: ({ value: y }) => Any(x || y),
  inspect: () => `Any(${x})`,
  fold: (f) => f(x),
  map: (f) => Any(f(x)),
  chain: (f) => f(x),
});

Any.isAny = (obj) => obj.kind === "Any";
Any.empty = () => Any(false);
