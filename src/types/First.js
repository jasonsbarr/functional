import { Option, Some, None } from "../Option.js";

export const First = (x) => {
  const value = Option.isOption(x) ? x : Some(x);
  return {
    kind: "First",
    value,
    concat: ({ value: y }) => (Option.isSome(value) ? value : y),
    // function arguments should accept an Option
    fold: (f) => f(value),
    option: (f, g) => value.fold(f, g),
    map: (f) => First(f(value)),
    ap: (o) => o.map(x.value),
    chain: (f) => f(value),
  };
};

First.isFirst = (obj) => obj.kind === "First";
First.empty = () => First(None(null));
