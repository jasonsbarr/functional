# Helper Functions

A collection of functions for various tasks. Assume a function is curried unless otherwise stated.

## assert

Asserts that its argument `expr` is truthy. Throws an error if `expr` is falsy.

- `assert(expr, message)`

Import:

```js
import { assert } from "@jasonsbarr/functional-core/lib/helpers/assert";
```

## assertEqual

Asserts that two values are equal according to value. Checks deep equality. Throws an error if the two values are not equal.

- `assertEqual(v1, v2, message)`

Import:

```js
import { assertEqual } from "@jasonsbarr/functional-core/lib/helpers/assertEqual";
```

## concatValues

Concatenates any two values that can be concatenated or added to another value of the same type. In the case of `null` or `undefined` as the first argument, simply returns the second.

- `concatValues(value1, value2)`

Import:

```js
import { concatValues } from "@jasonsbarr/functional-core/lib/helpers/concatValues";
```

## flip

Takes a function and 2 arguments, flips the argument order, then applies the function to the arguments.

- `flip(fn, x, y)`

Import:

```js
import { flip } from "@jasonsbarr/functional-core/lib/helpers/flip";
```

## handleNegativeIndex

Converts a negative numeric index to a positive number based on sequence length for functions that don't ordinarily take a negative index. Returns positive numbers untouched.

- `handleNegativeIndex(index)`

Import:

```js
import { handleNegativeIndex } from "@jasonsbarr/functional-core/lib/helpers/handleNegativeIndex";
```

## identity

Returns the value of its argument, untouched.

- `identity(x)`

Import:

```js
import { identity } from "@jasonsbarr/functional-core/lib/helpers/identity";
```

## ifElse

Applies `predicate` to `value`, then returns the value of `ifExpr` if `true` and `elseExpr` if `false`.

- `ifElse(predicate, ifExpr, elseExpr, value)`

Import:

```js
import { ifElse } from "@jasonsbarr/functional-core/lib/helpers/ifElse";
```

## liftA2

Lifts a function of 2 arguments so it can be applied to 2 values wrapped by functors.

- `liftA2(func, arg1, arg2)`

Import:

```js
import { liftA2 } from "@jasonsbarr/functional-core/lib/helpers/liftA2";
```

## liftA3

Lifts a function of 3 arguments so it can be applied to 3 values wrapped by functors.

- `liftA2(func, arg1, arg2, arg3)`

Import:

```js
import { liftA3 } from "@jasonsbarr/functional-core/lib/helpers/liftA3";
```

## liftA4

Lifts a function of 4 arguments so it can be applied to 4 values wrapped by functors.

- `liftA2(func, arg1, arg2, arg3, arg4)`

Import:

```js
import { liftA4 } from "@jasonsbarr/functional-core/lib/helpers/liftA4";
```

## liftA5

Lifts a function of 5 arguments so it can be applied to 5 values wrapped by functors.

- `liftA5(func, arg1, arg2, arg3, arg4, arg5)`

Import:

```js
import { liftA5 } from "@jasonsbarr/functional-core/lib/helpers/liftA5";
```

## log

Curried version of `console.log`. Single-argument version takes a label, then returns a function that prefixes the log message with that label. Not auto-curried, so you have to actually use 2 sets of parens if you're just calling it without returning the intermediary function.

- `log(label)(message)`

Import:

```js
import { log } from "@jasonsbarr/functional-core/lib/helpers/log";
```

## noop

Performs a noop, i.e. a function that does nothing.

- `noop()`

Import:

```js
import { noop } from "@jasonsbarr/functional-core/lib/helpers/noop";
```

## not

Negates its argument.

Import:

```js
import { not } from "@jasonsbarr/functional-core/lib/helpers/not";
```

## unit

Simply returns `null`.

- `unit()`

Import:

```js
import { unit } from "@jasonsbarr/functional-core/lib/helpers/unit";
```
