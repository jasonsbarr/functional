// unsafe - may return null value
export const atUnsafe = curry((i, iter) =>
  at(i, iter).fold(
    (x) => x,
    (x) => x
  )
);
