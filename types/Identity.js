export const Identity = (x) => ({
  kind: "Identity",
  map: (fn) => Identity(fn(x)),
  chain: (fn) => fn(x),
  fold: (fn) => fn(x),
  inspect: () => `Identity(${x})`,
});

Identity.of = (x) => Identity(x);
Identity.isIdentity = (obj) => obj.kind === "Identity";
