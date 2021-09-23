export const All = (x) => ({
  kind: "All",
  value: x,
  concat: ({ value: y }) => All(x && y),
  inspect: () => `All(${x})`,
  fold: (f) => f(x),
  map: (f) => All(f(x)),
  ap: (o) => o.map(x),
  chain: (f) => f(x),
});

All.isAll = (obj) => obj.kind === "All";
All.empty = () => All(true);
