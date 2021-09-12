export const Identity = (x) => ({
  kind: "Identity",
  value: x,
  map: (fn) => Identity(fn(x)),
  chain: (fn) => fn(x),
  fold: (fn) => fn(x),
  inspect: () => `Identity(${x})`,
  concat: (o) => Identity(x.concat(o)),
});

Identity.of = (x) => Identity(x);
Identity.isIdentity = (obj) => obj.kind === "Identity";
