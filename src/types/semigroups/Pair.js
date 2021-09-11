export const Pair = (x, y) => ({
  kind: "Pair",
  x,
  y,
  concat: ({ x: x1, y: y1 }) => Pair(x.concat(x1), y.concat(y1)),
  inspect: () => `Pair(${x}, ${y})`,
});

Pair.isPair = (obj) => obj.kind === "Pair";
