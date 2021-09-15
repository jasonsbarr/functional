// right-to-left composition of functions
export const compose =
  (...fns) =>
  (val) =>
    fns.reduceRight((v, fn) => fn(v), val);
