# Result Type

`Result` is like `Either` or `Option`: a bifunctor that can branch in one of two ways, the "happy" (`Ok`) and "sad" (`Err`) path. Whereas `Option` is for eliminating `null` checks and `Either` can be used for any bifurcation of values, `Result` is used for declarative error handling.

You'll never have to write another `try`/`catch` again; just use the `tryCatch` function and you can `map` and `chain` over the result. Or if you're handling a value that could be an error you can always use `Result.of` to lift the value into the type.

## Importing Result

```js
import { Result, Ok, Err, tryCatch } from "@jasonsbarr/functional-core/lib/types/Result";
```

## Type Representative

- `Result`

## Constructors

- `Result.of(x)` - `Ok(x)` if not an `Error`, `Err(x)` if it is
- `tryCatch(fn)` - returns `Ok(fn())` if execution succeeds or `Err(fn())` if it throws an error
- `Ok(x)` - creates an `Ok` wrapping `x`
- `Err(x)` - creates an `Err` wrapping `x`

## Type Representative Methods

- `isOk(x)`
- `isErr(x)`
- `isResult(x)`
- `empty()` - returns an empty `Ok`

## Instance Methods

- `map(fn)`
- `chain(fn)`
- `fold(f, g)` - first function folds an `Err`, second folds an `Ok`
- `inspect()`
- `isErr()`
- `isOk()`
- `concat(other)`
- `ap(other)` - lifts a function held inside a `Result` and applies it to an argument also held in a `Result`
- `alt(other)` - a chain of `alt`s returns the first `Ok` or the last `Err`
- `bimap(errFunc, okFunc)`
- `bichain(errFunc, okFunc)`
- `toString()`
