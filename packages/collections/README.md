# @jasonsbarr/collections

Iterable collections in JavaScript with functionalities that far outstrip the native capabilities of JavaScript Arrays, Objects, and Maps.

Collections include:

- Dict - a hash table or dictionary-like data structure intended for use with single-type values
- List - a linked list using Array-based cells
- Nil - represents the empty List for safe use with what would otherwise be `null` and `undefined` values
- Range - if all you need is to iterate over a range of numbers, this is what you need
- Tuple - immutable, Array-like collection

## Basic Usage

Import the collections you need and use as follows:

```js
import { Tuple } from "@jasonsbarr/collections/lib/Tuple";
import { isOdd } from "@jasonsbarr/functional-core/lib/predicates/isOdd";

const nums = Tuple(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const evens = nums.reject(isOdd);

console.log(evens.inspect()); // -> Tuple(2, 4, 6, 8, 10)
```

## Documentation

[Documentation](https://github.com/jasonsbarr/functional/tree/main/docs/collections)
