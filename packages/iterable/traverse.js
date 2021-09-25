import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";

export const traverse = curry((point, fn, iter) =>
  iter.reduce(
    (ys, x) => ys.map((x) => (y) => x.concat(iter.constructor(y))).ap(fn(x)),
    typeof iter.empty === "function" ? point(iter.empty()) : point([])
  )
);
