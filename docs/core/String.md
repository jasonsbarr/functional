# String Functions

String functions from the `@jasonsbarr/functional-core` library. Assume curried unless otherwise stated.

Note that none of these functions mutate their arguments. A new value is always returned.

## charAt

Returns the character found at `index`. Note that indices are divided by UTF-16 code units, which may not coincide with either code points or graphemes.

- `charAt(index, string)`

Import:

```js
import { charAt } from "@jasonsbarr/functional-core/lib/string/charAt";
```

## charCodeAt

Returns the char code found at `index`. See above for note on indices.

- `charCodeAt(index, string)`

Import:

```js
import { charCodeAt } from "@jasonsbarr/functional-core/lib/string/charCodeAt";
```

## codePointAt

Returns the code point found at `index`. See above for note on indices.

- `codePointAt(index, string)`

Import:

```js
import { codePointAt } from "@jasonsbarr/functional-core/lib/string/codePointAt";
```

## concat

Concatenates two or more strings.

- `concat(...strings)`

Import:

```js
import { concat } from "@jasonsbarr/functional-core/lib/string/concat";
```

## endsWith

Returns `true` if `string` ends with `endStr`.

- `endsWith(endStr, string)`

Import:

```js
import { endsWith } from "@jasonsbarr/functional-core/lib/string/endsWith";
```

## from

Returns a slice of `string` from `index` to the end.

- `from(index, string)`

Import:

```js
import { from } from "@jasonsbarr/functional-core/lib/string/from";
```

## includes

Returns `true` if `string` contains `subStr` starting at `startIndex`.

- `includes(subStr, startIndex, string)`

Import:

```js
import { includes } from "@jasonsbarr/functional-core/lib/string/includes";
```

## includesFromStart

Returns `true` if `string` contains `subStr` starting from the beginning of the string.

- `includes(subStr, string)`

Import:

```js
import { includesFromStart } from "@jasonsbarr/functional-core/lib/string/includesFromStart";
```

## indexOf

Returns `Option` of the index at which `subStr` is found, starting with `startIndex`.

- `indexOf(subStr, startIndex, string)`

Import:

```js
import { indexOf } from "@jasonsbarr/functional-core/lib/string/indexOf";
```

## indexOfFromStart

Returns `Option` of the index at which `subStr` is found, starting from the beginning of the string.

- `indexOfFromStart(subStr)`

Import:

```js
import { indexOfFromStart } from "@jasonsbarr/functional-core/lib/string/indexOfFromStart";
```

## lastIndexOf

Returns `Option` of the last index at which `subStr` is found, starting from `startIndex`.

- `lastIndexOf(subStr, startIndex, string)`

Import:

```js
import { lastIndexOf } from "@jasonsbarr/functional-core/lib/string/lastIndexOf";
```

## localeCompare

Compares `other` with `string` based on locale information. Returns 1 if `string` > `other`, - 1 if `other` > `string`, and 0 if they are equal.

- `localeCompare(other, string)`

Import:

```js
import { localeCompare } from "@jasonsbarr/functional-core/lib/string/localeCompare";
```

## match

Tests `string` for matches using `regexp`. Returns an `Option` that will contain an array if there are matches.

- `match(regexp, string)`

Import:

```js
import { match } from "@jasonsbarr/functional-core/lib/string/match";
```

## matchAll

Tests `string` for matches using `regexp`, which _must_ use the `g` flag. Returns an array of matches.

- `matchAll(regexp, string)`

Import:

```js
import { matchAll }## toUpperCase

Converts `string` to all uppercase.

- `toUpperCase(string)`

Import:

```js
import { toUpperCase } from "@jasonsbarr/functional-core/lib/string/matchAll";
```

## normalize

Performs Unicode normalization on `string`.

- `normalize(string)`

Import:

```js
import { normalize } from "@jasonsbarr/functional-core/lib/string/normalize";
```

## padEnd

Pad the end of `string` to `targetLength` using `padString`.

- `padEnd(targetLength, padString, string)`

Import:

```js
import { padEnd } from "@jasonsbarr/functional-core/lib/string/padEnd";
```

## padStart

Pad the beginning of `string` to `targetLength` using `padString`.

- `padStart(targetLength, padString, string)`

Import:

```js
import { padStart } from "@jasonsbarr/functional-core/lib/string/padStart";
```

## repeat

Repeat a string `times` number of times.

- `repeat(times)`

Import:

```js
import { repeat } from "@jasonsbarr/functional-core/lib/string/repeat";
```

## replace

Replace `search` in `string` with `replacement`.

- `replace(search, replacement, string)`

Import:

```js
import { replace } from "@jasonsbarr/functional-core/lib/string/replace";
```

## replaceAll

Replace all occurrences of `search` in `string` with `replacement`.

- `replaceAll(search, replacement, string)`

Import:

```js
import { replaceAll } from "@jasonsbarr/functional-core/lib/string/replaceAll";
```

## search

Returns the index matched by `regexp` or -1 if there is no match.

- `search(regexp, string)`

Import:

```js
import { search } from "@jasonsbarr/functional-core/lib/string/search";
```

## slice

Return a copy of `string` from `start` index to `end` (non-inclusive).

- `slice(start, end, string)`

Import:

```js
import { slice } from "@jasonsbarr/functional-core/lib/string/slice";
```

## split

Return an array of `string` pieces, split at `splitter`.

- `split(splitter, string)`

Import:

```js
import { split } from "@jasonsbarr/functional-core/lib/string/split";
```

## toUpperCase

Converts `string` to all uppercase.

- `toUpperCase(string)`

Import:

```js
import { toUpperCase } from "@jasonsbarr/functional-core/lib/string/toUpperCase";
```
