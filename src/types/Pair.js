import { concatValues } from "../functions/helpers/concatValues.js";

// x and y must be Semigroups
export const Pair = (x, y) => ({
  kind: "Pair",
  x,
  y,
  concat: ({ x: x1, y: y1 }) => Pair(concatValues(x, x1), concatValues(y, y1)),
  inspect: () => `Pair(${x}, ${y})`,
});

Pair.isPair = (obj) => obj.kind === "Pair";
