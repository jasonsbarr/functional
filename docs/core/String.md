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
