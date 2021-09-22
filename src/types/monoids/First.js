import { Option, Some, None } from "../Option.js";

export const First = (x) => {
  const value = Option.isOption(x) ? x : Some(x);
  return {
    kind: "First",
    value,
    concat: ({ value: y }) => (Option.isSome(value) ? value : y),
    fold: (f) => f(value),
    option: (f, g) => value.fold(f, g),
    map: (f) => First(f(value)),
    chain: (f) => f(value),
  };
};

First.isFirst = (obj) => obj.kind === "First";
First.isEmpty = () => First(None(null));
