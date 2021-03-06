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

### ap

Apply a Functor-wrapped function to a `Str` value.

- `str.ap(functorWithFn)`

### chain

Map a `Str` with a function that returns another `Str`.

- `str.chain(functionThatReturnsStr)`

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

### equals

Test if a `Str` value equals another `Str`.

- `str.equals(other)`

### fold

Optionally transform and extract the value from a `Str`.

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

Returns an `Option` of the index at which `subStr` is found, starting at the beginning. Works with `subStr` as either a string or a `Str`.

- `str.indexOfFromStart(subStr)`

### lastIndexOf

Returns an `Option` of the last index at which `subStr` is found, starting at `startIndex`. Works with either a string or a `Str`.

- `str.lastIndexOf(subStr, startIndex)`

### localeCompare

Returns 1 (`str` is greater), -1 (`other` is greater), or 0 (they are equal) after comparing `str` with `other` based on locale information. Works with either a string or a `Str`.

- `str.localeCompare(other)`

### map

Transform the value of a `Str` and return it wrapped in another `Str`.

- `str.map(mapFn)`

### match

Tests a `Str` value against `regexp`. Returns an `Option` that will contain an array if there are matches.

- `str.match(regexp)`

### matchAll

Tests a `Str` value against `regexp`, which _must_ use the `g` flag. Returns an array of matches.

- `str.matchAll(regexp)`

### normalize

Performs Unicode normalization on a `Str` value.

- `str.normalize()`

### padEnd

Pad a `Str` value to `targetLength` using `padString`. `padString` can be either a `Str` or a string.

- `str.padEnd(targetLength, padString)`

### padStart

Pad a `Str` value to `targetLength` using `padString`. `padString` can be either a `Str` or a string.

- `str.padStart(targetLength, padString)`

### repeat

Repeat a `Str` value `times` number of times.

- `str.repeat(times)`

### replace

Replace the first occurrence of `search` in a `Str` value with `replacement`. Both `search` and `replacement` can be either a string or `Str`.

- `str.replace(search, replacement)`

### replaceAll

Replace _all_ occurrences of `search` in a `Str` value with `replacement`. Both `search` and `replacement` can be either a string or `Str`.

- `str.replaceAll(search, replacement)`

### search

Returns the index at which `regexp` is matched, or -1 if there is no match.

- `str.search(regexp)`

### slice

Return a slice of the `Str` value from `start` to `end` (non-inclusive).

- `str.slice(start, end)`

### split

Return an array of string pieces separated at `splitter`. `splitter` defaults to `""`, which will split apart every UTF-16 code unit. `splitter` can be either a string or `Str`.

- `str.split(splitter)`

### splitGrapheme

Splits a string into its constituent extended grapheme clusters. Returns an array.

- `str.splitGrapheme()`

### startsWith

Returns `true` if `Str` value starts with `search`. `search` can be either a string or `Str`.

- `str.startsWith(search, startIndex)`

### startsWithFromStart

Returns `true` if `Str` value starts with `search` at the beginning of the `Str`. `search` can be either a string or `Str`.

- `str.startsWithFromStart(search)`

### substring

Returns a slice of the `Str` value starting with `start` and ending with `end` (non-inclusive).

- `str.substring(start, end)`

### toLocaleLowerCase

Returns a new `Str` with the value lower-cased according to the rules of `locales`. `locales` can either be a valid locale string or an array of locales.

- `str.toLocaleLowerCase(locales)`

### toLocaleUpperCase

Returns a new `Str` with the value upper-cased according to the rules of `locales`. `locales` can either be a valid locale string or an array of locales.

### toLowerCase

Converts a `Str` to lower case.

- `str.toLowerCase()`

### toUpperCase

Converts a `Str` to upper case.

- `str.toUpperCase()`

### trim

Returns a new `Str` with whitespace removed from the front and back of its value.

- `str.trim()`

### trimEnd

Returns a new `Str` with whitespace trimmed from the back of its value.

- `str.trimEnd()`

### trimStart

Returns a new `Str` with whitespace trimmed from the front of its value.

- `str.trimStart()`
