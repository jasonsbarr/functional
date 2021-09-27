# Str Type Documentation

The `Str` type is an object wrapper around a string value that allows easy chaining of the string manipulation functions both from this library and the functional-core library.

## Str Usage

Import:

```js
import { Str } from "@jasonsbarr/string/lib/Str";
```

Construction:

```js
const str = Str("Hello");
```

Extracting the primitive string value:

```js
const hello = str.valueOf();
```

## Str Methods

A list of the valid `Str` methods, their parameters, and return types. Any method that returns a `Str` can be chained.

### splitGrapheme

Splits a string into its constituent extended grapheme clusters. Returns a Tuple.

- `str.splitGrapheme()`

### toUpperCase

Converts a string to upper case. Returns a `Str`.

- `str.toUpperCase()`
