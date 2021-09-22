import { identity } from "../../functions/helpers/identity.js";

export const Endo = (x) => ({
  kind: "Endo",
  value: x, // must be a function
  concat: ({ value: y }) => Endo(x(y)),
  inspect: () => `Endo(${x})`,
  fold: (f) => f(x),
  map: (f) => Endo(f(x)),
  ap: (o) => o.map(x),
  chain: (f) => f(x),
  run: (v) => x(v),
});

Endo.isEndo = (obj) => obj.kind === "Endo";
Endo.empty = () => Endo(identity);
