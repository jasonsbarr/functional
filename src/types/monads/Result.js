/*
 * type Result = Success(x: Ok) | Failure(x: Error)
 */

export const Result = {
  of: (x) => (x instanceof Error ? Err(x) : Ok(x)),
  isOk: (obj) => obj.kind === "Ok",
  isErr: (obj) => obj.kind === "Err",
  isResult: (obj) => obj.kind === "Ok" || obj.kind === "Err",
};

export const Ok = (x) => ({
  kind: "Ok",
  value: x,
  map: (f) => Result.of(f(x)),
  chain: (f) => f(x),
  fold: (f, g) => g(x),
  inspect: () => `Ok(${x})`,
  isErr: () => false,
  isOk: () => true,
  concat: (o) =>
    o.fold(
      (e) => Err(e),
      (ok) => Ok(x.concat(ok))
    ),
});

export const Err = (x) => ({
  kind: "Err",
  value: x,
  map: (f) => Err(x),
  chain: (f) => Err(x),
  fold: (f, g) => f(x),
  inspect: () => `Err(${x})`,
  isErr: () => true,
  isOk: () => false,
  concat: (o) => Err(x),
});

export const tryCatch = (f) => {
  try {
    return Ok(f());
  } catch (e) {
    return Err(e);
  }
};
