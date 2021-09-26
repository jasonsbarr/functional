# Option Type

Type that allows you to handle `null`, `undefined`, and `NaN` values without having to use a bunch of imperative code to check for them. The `Some` variant holds the value of a computation, whereas `None` handles the `null`, `undefined`, and `NaN` cases.

Several functions in the functional-core package that can return `null` or `undefined` in the standard JavaScript library return `Option` types instead.

## Type Representative

- `Option`

## Constructors

- `Option.of(x)` - `None(x)` if `null`, `undefined`, or `NaN`, `Some(x)` otherwise
- `Some(x)` - creates a `Some` wrapping `x`
- `None(x)` - creates a `None` wrapping `x`

## Type Representative Methods

- `isSome(x)`
- `isNone(x)`
- `isOption(x)`
- `empty()` - returns an empty `Some`

## Instance Methods

- `map(fn)`
- `chain(fn)`
- `fold(f, g)` - first function is for folding a `None`, second is for folding a `Some`
- `inspect()`
- `isNone()`
- `isSome()`
- `concat(other)`
- `ap(other)` - applies a function wrapped inside an `Option` to a value also wrapped in an `Option`
- `alt(other)` - a chain of `alt`s returns either the first `Some` or the last `None`
- `bimap(noneFunc, someFunc)`
- `bichain(noneFunc, someFunc)`
- `toString()`

## Functions

- `safe(predicate)` - returns a function that checks a value against `predicate`, which then returns `Some(value)` if it passes and `None` if it doesn't
