# String Package Functions

String package function documentation, including importing and usage information.

## splitGrapheme

Split a string into extended grapheme clusters. Returns an array.

- `splitGrapheme(str)`

Import:

```js
import { splitGrapheme } from "@jasonsbarr/string/lib/splitGrapheme";
```

Usage:

```js
splitGrapheme("😀😁😂"); // -> [😀, 😁, 😂]
```
