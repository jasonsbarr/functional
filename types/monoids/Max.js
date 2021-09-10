export const Max = (x) => ({
  kind: "Max",
  value: x,
  concat: ({ value: y }) => Max(x > y ? x : y),
  inspect: () => `Max(${x})`,
});

Max.isMax = (obj) => obj.kind === "Max";
Max.empty = () => Max(-Infinity);
