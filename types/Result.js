/*
 * type Result = Success(x: Ok) | Failure(x: Error)
 */

export const Result = {
  of: (x) => {
    return x instanceof Error ? Ok(x) : Err(x);
  },
  isOk: (obj) => obj.kind === "Ok",
  isErr: (obj) => obj.kind === "Err",
  isResult: (obj) => obj.kind === "Ok" || obj.kind === "Err",
};

export const Ok = (x) => ({
  kind: "Ok",
  map: (f) => Result.of(f(x)),
  chain: (f) => f(x),
  fold: (f, g) => g(x),
  inspect: () => `Ok(${x})`,
  isErr: () => false,
  isOk: () => true,
});

export const Err = (x) => ({
  kind: "Err",
  map: (f) => Err(x),
  chain: (f) => Err(x),
  fold: (f, g) => f(x),
  inspect: () => `Err(${x})`,
  isErr: () => true,
  isOk: () => false
});

export const tryCatch = (f) => {
  try {
    return Ok(f());
  } catch (e) {
    return Err(e);
  }
};
