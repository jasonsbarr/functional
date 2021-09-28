# Function Functions

A collection of functions that operate on other functions.

## apply

Curried function application. Applies a function to a list of arguments.

- `apply(fn)(...args)`

Import:

```js
import { apply } from "@jasonsbarr/functional-core/lib/lambda/apply";
```

## applyToAll

Runs a reduce operation on a list of arguments.

- `applyToAll(fn)(...list)`

Import:

```js
import { applyToAll } from "@jasonsbarr/functional-core/lib/lambda/applyToAll";
```

## bind

Binds a function to a context and optional arguments.

- `bind(context, fn, ...args)`

Import:

```js
import { bind } from "@jasonsbarr/functional-core/lib/lambda/bind";
```

## call

Calls a function with a list of arguments.

- `call(fn, ...args);

Import:

```js
import { call } from "@jasonsbarr/functional-core/lib/lambda/call";
```

## compose

Composes a list of single-arity functions from right to left.

- `compose(...fns)`

Import:

```js
import { compose } from "@jasonsbarr/functional-core/lib/lambda/compose";
```

## curry

Curries a function of any arity.

- `curry(fn)`

Import:

```js
import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry";
```

## curryN

Curries a function to `n` number of arguments. Good for setting a minimum number of args on a variadic function.

- `curryN(n, fn)`

Import:

```js
import { curryN } from "@jasonsbarr/functional-core/lib/lambda/curryN";
```

## defer

Defer a function's execution until after the current cycle of the event loop.

- `defer(fn)`

Import:

```js
import { defer } from "@jasonsbarr/functional-core/lib/lambda/defer";
```

## getArrayFromArgs

Returns a list of arguments as an array. If the first argument is an array, returns that.

- `getArrayFromArgs(...args)`

Import:

```js
import { getArrayFromArgs } from "@jasonsbarr/functional-core/lib/lambda/getArrayFromArgs";
```

## once

Returns a function that will execute once. If it is called again, it returns the value of the first execution.

- `once(fn)`

Import:

```js
import { once } from "@jasonsbarr/functional-core/lib/lambda/once";
```

## pipe

Composes functions from left to right.

- `pipe(...fns)`

Import:

```js
import { pipe } from "@jasonsbarr/functional-core/lib/lambda/pipe";
```

## pipeline

Pipes a value through a series of single-arity functions.

`pipeline(value, ...fns)`

Import:

```js
import { pipeline } from "@jasonsbarr/functional-core/lib/lambda/pipeline";
```

## thunk

Delay evaluation of a function until its value is needed.

- `thunk(fn)`

Import:

```js
import { thunk } from "@jasonsbarr/functional-core/lib/lambda/thunk";
```
