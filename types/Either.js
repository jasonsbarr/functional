/*
 * type Either = Right(x: R) | Left(x: L)
 */

export const Either = {
  of: (pred) => (x) => {
    return pred() ? Right(x) : Left(x);
  },
  isRight: (obj) => obj.kind === "Right",
  isLeft: (obj) => obj.kind === "Left",
  isEither: (obj) => obj.kind === "Right" || obj.kind === "Left",
};

export const Right = (x) => ({
  kind: "Right",
  map: (f) =>
    Either.of(
      () => typeof f(x) === typeof x && f(x) != null && !Number.isNaN(f(x))
    )(f(x)),
  chain: (f) => f(x),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
  isLeft: () => false,
  isRight: () => true,
});

export const Left = (x) => ({
  kind: "Left",
  map: (f) => Left(x),
  chain: (f) => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
  isLeft: () => true,
  isRight: () => false,
});
