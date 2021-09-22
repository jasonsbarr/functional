// use for adding numbers or concatting strings
export const Sum = (x) => ({
  kind: "Sum",
  value: x,
  concat: ({ value: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`,
  fold: (f) => f(x),
  map: (f) => Sum(f(x)),
  chain: (f) => f(x),
});

Sum.isSum = (obj) => obj.kind === "Sum";
Sum.empty = () => Sum(0);
