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

## toUpperCase

Converts `string` to all uppercase.

- `toUpperCase(string)`

Import:

```js
import { toUpperCase } from "@jasonsbarr/functional-core/lib/string/toUpperCase";
```

## localeCompare

Compares `other` with `string` based on locale information. Returns 1 if `string` > `other`, - 1 if `other` > `string`, and 0 if they are equal.

- `localeCompare(other, string)`
