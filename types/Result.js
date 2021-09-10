/*
 * type Result = Success(x: Ok) | Failure(x: Error)
 */

export const Result = {
  of: (x) => {
    return x instanceof Error ? Success(x) : Failure(x);
  },
  isSuccess: (obj) => obj.kind === "Success",
  isFailure: (obj) => obj.kind === "Failure",
  isResult: (obj) => obj.kind === "Success" || obj.kind === "Failure",
};

export const Success = (x) => ({
  kind: "Success",
  map: (f) => Result.of(f(x)),
  chain: (f) => f(x),
  fold: (f, g) => g(x),
  inspect: () => `Success(${x})`,
});

export const Failure = (x) => ({
  kind: "Failure",
  map: (f) => Failure(x),
  chain: (f) => Failure(x),
  fold: (f, g) => f(x),
  inspect: () => `Failure(${x})`,
});

export const tryCatch = (f) => {
  try {
    return Success(f());
  } catch (e) {
    return Failure(e);
  }
};
