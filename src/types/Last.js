import { Option, Some, None } from "../Option.js";

export const Last = (x) => {
  const value = Option.isOption(x) ? x : Some(x);
  return {
    kind: "Last",
    value,
    concat: ({ value: y }) => (Option.isSome(y) ? y : value),
    fold: (f) => f(value),
    option: (f, g) => value.fold(f, g),
    map: (f) => Last(f(value)),
    ap: (o) => o.map(x.value),
    chain: (f) => f(value),
  };
};

Last.isLast = (obj) => obj.kind === "Last";
Last.empty = () => Last(None(null));
