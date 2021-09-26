Monadic type for computations that can go one of two ways: `Right` for the "happy path" when things go as planned, and `Left` for the "sad path" when they don't.

## Constructors

- `Right(x)` - creates a `Right` wrapping `x`
- `Left(x)` - creates a `Left` wrapping `x`

## Type Representative Methods

- `Either.of(x)` - returns a `Right` of `x`
- `Either.isRight(x)`
- `Either.isLeft(x)`
- `Either.isEither(x)`
- `Either.empty()` - returns an empty `Left`

## Instance Methods

All instances have these regardless of whether they're a `Right` or `Left`.

- `map(fn)`
- `chain(fn)`
- `fold(f, g)` - first function is for folding a `Left`, second function is for folding a `Right`
- `inspect()`
- `isLeft()`
- `isRight()`
- `concat(other)`
- `ap(other)` - applies a function that's been lifted into an `Either` to an argument also wrapped in an `Either`
- `alt(other)` - returns either the first `Right` in a chain of `alt`s or the last `Left`
- `bimap(leftFunc, rightFunc)`
- `bichain(leftFunc, rightFunc)`
- `toString()`
