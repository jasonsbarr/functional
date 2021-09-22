import { assign } from "../../functions/object/assign.js";

export const Assign = (x) => ({
  kind: "Assign",
  value: x,
  concat: ({ value: y }) => assign({}, x, y),
  inspect: () => `Assign(${x})`,
  fold: (f) => f(x),
  map: (f) => Assign(f(x)),
  ap: (o) => o.map(x),
  chain: (f) => f(x),
});

Assign.isAssign = (obj) => obj.kind === "Assign";
Assign.empty = () => ({});
