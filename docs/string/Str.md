# Str Type

The `Str` type is an object wrapper around a string value that allows easy chaining of the string manipulation functions both from this library and the functional-core library.

## Type Classes

- Apply
- Applicative
- Chain
- Fold
- Functor
- Monoid
- SemiGroup

## Str Usage

Import:

```js
import { Str } from "@jasonsbarr/string/lib/Str";
```

Construction:

```js
const str = Str("Hello");
```

or:

```js
const str = Str.of("Hello");
```

Extracting the primitive string value:

```js
const hello = str.valueOf();
```

## Static Methods

`Str` static methods, called on the `Str` constructor.

### Str.of

Constructs a `Str` instance from `value`.

- `Str.of(value)`

### Str.empty

Constructs an empty `Str`.

- `Str.empty()`

### Str.fromCharCode

Constructs a `Str` from one or more UTF-16 char codes.

`Str.fromCharCode(...codes)`

### fromCodePoint

Constructs a `Str` from one or more Unicode code points.

- `Str.fromCodePoint(...points)`

## Instance Methods

A list of the valid `Str` instance methods, their parameters, and return types. Any method that returns a `Str` can be chained.

### charAt

Returns a `Str` of the character at `index`. Indices are split by UTF-16 code units.

- `str.charAt(index)`

### charCodeAt

Returns a Number that represents the char code at `index`.

- `str.charCodeAt(index)`

### concat

Works on a string or another instance of `Str`. Returns a `Str` of the 2 string values concatenated together.

- `str.concat(other)`

### endsWith

Returns `true` if the `Str` value ends with `endStr`. Works with either a string or `Str` as argument.

- `str.endsWith(endStr)`

### from

Slices a `Str` from `index` to the end. Returns a `Str`.

- `str.from(index)`

### includes

Returns `true` if the `Str` value includes `subStr` starting at `startIndex`. Works with either a string or `Str` as argument.

- `str.includes(subStr, startIndex)`

### includesFromStart

Returns `true` if the `Str` value includes `subStr` starting from the beginning. Works with either a string or a `Str` as argument.

- `str.includesFromStart(subStr)`

### indexOf

Returns an `Option` of the index at which `subStr` is found, starting at `startIndex`. Works with either a string or a `Str` as argument.

- `str.indexOf(subStr, startIndex)`

### indexOfFromStart

Returns an `Option` of the index at which `subStr` is found, starting at the beginning. Works with either a string or a `Str`.

- `str.indexOfFromStart(subStr)`

### lastIndexOf

Returns an `Option` of the last index at which `subStr` is found, starting at `startIndex`. Works with either a string or a `Str`.

- `str.lastIndexOf(subStr, startIndex)`

### localeCompare

Returns 1, -1, or 0 after comparing `str` with `other` based on locale information. Works with either a string or a `Str`.

- `str.localeCompare(other)`

### splitGrapheme

Splits a string into its constituent extended grapheme clusters. Returns a Tuple.

- `str.splitGrapheme()`

### toUpperCase

Converts a string to upper case. Returns a `Str`.

- `str.toUpperCase()`
