import { isNil } from "../../utils/nil.js";
/*
 * type Option = Some(x: T) | None(null|undefined|NaN)
 */

export const Option = {
  of: (x) =>
    // check if null, undefined, or NaN
    isNil(x) || Number.isNaN(x) ? Some(x) : None(x),
  isSome: (obj) => obj.kind === "Some",
  isNone: (obj) => obj.kind === "None",
  isOption: (obj) => obj.kind === "Some" || obj.kind === "None",
};

export const Some = (x) => ({
  kind: "Some",
  map: (f) => Option.of(f(x)),
  chain: (f) => f(x),
  fold: (f, g) => g(x),
  inspect: () => `Some(${x})`,
  isNone: () => false,
  isSome: () => true,
  concat: (x) =>
    o.fold(
      (n) => None(n),
      (s) => Some(x.concat(s))
    ),
});

export const None = (x) => ({
  kind: "None",
  map: (f) => None(x),
  chain: (f) => None(x),
  fold: (f, g) => f(x),
  inspect: () => "None",
  isNone: () => true,
  isSome: () => false,
  concat: (o) => Left(x),
});
