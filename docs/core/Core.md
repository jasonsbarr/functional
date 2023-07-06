# Core Functions and Types

The following core functions and types can be imported from the `functional-core` package entry point:

```js
import * as f from "@jasonsbarr/functional-core";
```

## Core Functions

Core functions are mostly for working with functional types created with `createType`, but there are also some important utility functions.

### `bichain`

```js
import { bichain } from "@jasonsbarr/functional-core";

bichain(leftF, rightF, obj);
```

Applies a function that produces a value of type class Bichain based on whether `obj` is a "left" or "right" instance of its type.

### `bimap`

```js
import { bimap } from "@jasonsbarr/functional-core";

bimap(leftF, rightF, obj);
```

Applies a function to the value of a Bifunctor based on whether `obj` is a "left" or "right" instance of its type, and returns another Bifunctor instance.

### `chain`

```js
import { chain } from "@jasonsbarr/functional-core";

chain(fn, value);
```

Applies a function that returns a value of type class Chain to the value of an instance of the Chain type class.

### `compare`

```js
import { compare } from "@jasonsbarr/functional-core";

compare(obj1, obj2);
```

Compares two values, using the first value's built-in `compare` method if there is one. Uses the library's `lt` and `equals` functions if not. Returns -1 if `obj1` is less than `obj2`, 0 if they are equal, and ` if it is greater.

### `compose`

```js
import { compose } from "@jasonsbarr/functional-core";

compose(fn1, fn2, fn3 ...);
```

Performs function composition from last-to-first. Functions must be unary or curried with partial application.

### `composeR`

```js
import { composeR } from "@jasonsbarr/functional-core";

composeR(fn1, fn2, fn3 ...);
```

Performs function composition from first-to-last. Same constraints as `compose`. In some libraries this function is known as "pipe."

### `concat`

```js
import { concat } from "@jasonsbarr/functional-core";

concat(sg1, sg2);
```

Concatenates two members of a SemiGroup type together. Checks first for the presence of a `concat` method and uses that, otherwise will attempt to concatenate JS built-in types based on common operations. You're better off explicitly defining your `concat` method on the types you use.

### `createType`

A function that allows you to [create data types](./CreatingTypes.md).

### `curry`

```js
import { curry } from "@jasonsbarr/functional-core";

curry((a, b) => a + b);
```

Curries any n-ary function. The function will be partially applied until all its arguments are given.

### `curryN`

```js
import { curryN } from "@jasonsbarr/functional-core";

curryN(2, (a, b, c) => a + b + c);
```

Curries an n-ary function to a specified number of arguments. Takes a number as its first argument to define the number of arguments required to execute the function.

### `defer`

```js
import { defer } from "@jasonsbarr/functional-core";

defer(fn);
```

Defers the execution of `fn` until after the current iteration of the event loop.

### `empty`

```js
import { empty } from "@jasonsbarr/functional-core";

empty(Option);
```

Constructs an empty instance of the type given to it. Said type must implement the `Monoid` type class.

### `equals`

```js
import { equals } from "@jasonsbarr/functional-core";

equals(obj1, obj2);
```

Checks two values for equality. If they implement the `Setoid` type class it uses the type's definition of equality; otherwise, uses structural equality.

### `Err`

```js
import { Err } from "@jasonsbarr/functional-core";

Err(new Error("Whoops!"));
```

Constructor for the `Err` variant of the `Result` type.

### `failure`

```js
import { failure } from "@jasonsbarr/functional-core";

failure("Expression must equal 42");
```

Throws an error with the given message string. For when you need to throw an error from an expression context.

### `fold`

```js
import { fold } from "@jasonsbarr/functional-core";

fold(console.log, value);
```

Extracts the value from a Foldable type. Can take any number of function arguments, depending on the number of variants a type has. The instance is always the last argument.

### `fst`

```js
import { fst } from "@jasonsbarr/functional-core";

fst([0, 1]);
```

Gets the first value of an array pair. Argument _must_ have at least one value.

### `getType`

```js
import { getType } from "@jasonsbarr/functional-core";

getType(obj);
```

Gets the type of a value. For objects, gets the constructor name. For types created with `createType`, gets the type name. Returns "Array" for JS Arrays, "Set" for JS Sets, "Map" for JS Maps, and "null" for JS null.

### `gt`

```js
import { gt } from "@jasonsbarr/functional-core";

gt(obj1, obj2);
```

Checks if `obj1` is greater than `obj2`. If the type of the values checked doesn't implement the `Ord` type class, checks based on primitive values (which probably isn't what you want).

### `gte`

```js
import { gte } from "@jasonsbarr/functional-core";

gte(obj1, obj2);
```

Checks if `obj1` is greater than or equal to `obj2`. Expects values to implement `Ord`.

### `head`

```js
import { head } from "@jasonsbarr/functional-core";

head([1, 2, 3]);
```

Extracts the first value of an iterable. Iterable _must_ contain at least one item.

### `identity`

```js
import { identity } from "@jasonsbarr/functional-core";

identity("hello");
```

Performs the identity function, i.e. returns the value of its argument.

### `last`

```js
import { last } from "@jasonsbarr/functional-core";

last([1, 2, 3]);
```

Returns the last value of an iterable. Iterable _must_ contain at least one value.

### `Left`

```js
import { Left } from "@jasonsbarr/functional-core";

Left(value);
```

### `length`

```js
import { length } from "@jasonsbarr/functional-core";

length([1, 2, 3]);
```

Returns the length or size of an iterable or collection. Works with JS Arrays, Maps, and Sets as well as custom iterables that have either a length or size property.

Constructs a `Left` instance of the `Either` type.

### The liftA\* functions

```js
import { liftA2, liftA3, liftA4, liftA5 } from "@jasonsbarr/functional-core";

liftA2((a, b) => a + b, ap1, ap2);
```

Lifts a function into an Apply context and applies it to the values of its arguments. Function must be curried and take the number of arguments specified by the `liftA*` function.

### `lt`

```js
import { lt } from "@jasonsbarr/functional-core";

lt(obj1, obj2);
```

Checks if `obj1` is less than `obj2`. Expects values to implement `Ord`.

### `lte`

```js
import { lte } from "@jasonsbarr/functional-core";

lte(obj1, obj2);
```

Checks if `obj1` is less than or equal to `obj 2`. Expects values to implement `Ord`.

### `map`

```js
import { map } from "@jasonsbarr/functional-core";

map((x) => x + 1, Some(5));
```

Applies a function to the value of an instance of a Functor type and returns a new instance of that Functor type.

### `memo`

```js
import { memo } from "@jasonsbarr/functional-core";

const fact = (n) => (n == 0 || n == 1 ? 1 : n * fact(n - 1));

const factMemo = memo(fact);
```

Memoizes a function.

### `None`

```js
import { None } from "@jasonsbarr/functional-core";

None();
```

Constructs the `None` variant of the `Option` type.

### `noop`

```js
import { noop } from "@jasonsbarr/functional-core";

noop();
```

Performs a noop (a function application that does nothing).

### `now`

```js
import { now } from "@jasonsbarr/functional-core";

now();
```

Returns a `Date` with the value of the current date/time.

### `of`

```js
import { of } from "@jasonsbarr/functional-core";

of(Option, 10);
```

Lifts a value into the supplied Applicative's context.

### `Ok`

```js
import { Ok } from "@jasonsbarr/functional-core";

Ok(value);
```

Constructor for the `Ok` variant of the `Result` type.

### `once`

```js
import { once } from "@jasonsbarr/functional-core";

const doOnce = once(fn);
```

Returns a function that can only be called once, and caches its value. Subsequent calls will return the cached value.

### `pair`

```js
import { pair } from "@jasonsbarr/functional-core";

pair(0, 1);
```

Takes 2 arguments and returns an array pair.

### `pipe`

```js
import { pipe } from "@jasonsbarr/functional-core";

pipe(val, fn1, fn2 ... fnN);
```

"Pipes" a value through a series of unary or curried and partially applied functions. Similar to the "|>" operator in F#, if "|>" worked with multiple functions.

### `Record`

```js
import { Record } from "@jasonsbarr/functional-core";

const Person = Record("name", "age");

const me1 = Person("Jason", 41);
const me2 = Person.of({ name: "Jason", age: 41 });
```

Returns a `Record` constructor that accepts values for the specified fields.

Constructor can also be called as `Constructor.of(obj)`, which converts the object into a record as long as the fields match.

### `record`

```js
import { record } from "@jasonsbarr/functional-core";

const me = record({ name: "Jason", age: 41 });
```

Takes an object and returns a `Record` with the same fields and values.

### `reduce`

```js
import { reduce } from "@jasonsbarr/functional-core";

reduce((sum, n) => sum + n, 0, [1, 2, 3, 4, 5]);
```

Reduces a Foldable value and extracts it from its context. Foldables should implement a `reduce` method that takes a function and an initial value.

### `Right`

```js
import { Right } from "@jasonsbarr/functional-core";

Right(value);
```

Constructs a `Right` instance of the `Either` type.

### `safe`

```js
import { safe } from "@jasonsbarr/functional-core";

const isSafeNum = safe((v) => typeof v === "number" && !Number.isNaN(v));
isSafeNum(5);
```

Takes a predicate function and then returns a function that returns either `Some` of the value given to it if it passes the predicate or `None` if it doesn't.

### `sequence`

```js
import { sequence } from "@jasonsbarr/functional-core";

sequence(point, traversable);

sequence(Option.of, arrOfOptions);
```

Runs the `sequence` operation on a Traversable, converting a traversable into a value of `point`. For example, taking a list of Options and converting it into an Option of a list.

### `show`

```js
import { show } from "@jasonsbarr/functional-core";

show(Option.of(5));
```

Expects a member of the `Show` type class. Returns a string representation of the instance.

### `snd`

```js
import { snd } from "@jasonsbarr/functional-core";

snd([0, 1]);
```

Returns the second element of a pair. Expects its argument to have 2 elements.

### `Some`

```js
import { Some } from "@jasonsbarr/functional-core";

Some(42);
```

Constructs a `Some` instance of the `Option` type.

### `swap`

```js
import { swap } from "@jasonsbarr/functional-core";

swap(leftF, rightF, instance);
```

Converts a "left" variant into its associated "right" and vice-versa, using `leftF` to map left-to-right and `rightF` to map right-to-left.

### `switchType`

```js
import { switchType } from "@jasonsbarr/functional-core";

switchType(
  Option,
  {
    Some: (v) => "Something: " + v,
    None: () => "Nothing",
  },
  instance
);
```

Matches a type on its variants. Allows you to extract an instance's value or perform other operations on it. Checks variants exhaustively at runtime, so you _must_ have a case for each variant unless you use `_` as a catchall in which case it short-circuits checking.

### `tail`

```js
import { tail } from "@jasonsbarr/functional-core";

tail([1, 2, 3, 4, 5]);
```

Returns the tail (every element except the first) of an iterable. Expects the iterable to have a `slice` method similar to `Array.prototype.slice`.

### `traverse`

```js
import { traverse } from "@jasonsbarr/functional-core";

traverse(point, fn, instance);
```

Performs a traverse operation on `instance`, applying `fn` as a map to convert its type to that of `point`. E.g. converting a list of Options to an Option of a list.

### `tryCatch`

```js
import { tryCatch } from "@jasonsbarr/functional-core";

tryCatch(() => JSON.parse(file));
```

Takes a function and executes it in a try/catch block. Returns a `Result` type: `Ok` of the value if the function call succeeds, `Err` of the Error if it throws an error.

### `unit`

```js
import { unit } from "@jasonsbarr/functional-core";

unit();
```

Returns `null`.

### `zero`

```js
import { zero } from "@jasonsbarr/functional-core";

zero(Option);
```

Returns the zero value of a type that implements the `Plus` type class.

## Available Core Types

- [Either](./Either.md)
- [Id](./Id.md)
- [Option](./Option.md)
- [Record](./Record.md)
- [Result](./Result.md)
