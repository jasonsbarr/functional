export const Min = (x) => ({
  kind: "Min",
  value: x,
  concat: ({ value: y }) => Min(x < y ? x : y),
  inspect: () => `Min(${x})`,
});

Min.isMin = (obj) => obj.kind === "Min";
Min.empty = () => Min(Infinity);
