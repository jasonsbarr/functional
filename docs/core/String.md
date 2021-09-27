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

Returns `true` if `string` contains `subStr`.

- `includes(subStr, string)`

Import:

```js
import { includes } from "@jasonsbarr/functional-core/lib/string/includes";
```
