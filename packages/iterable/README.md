# @jasonsbarr/iterable

A collection of iterable functions that work equally well on plain JavaScript arrays and other indexed iterables that implement a simple specification: they have a `constructor` method that doesn't take the `new` keyword.

## Basic Usage

Just import the functions you need. They work with arrays just fine, or you can use another iterable type as long as it has a `constructor` method that doesn't require using `new`.

```js
import { reject } from "@jasonsbarr/iterable/lib/reject";
import { isEven } from "@jasonsbarr/functional-core/lib/predicates/isEven";

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const odds = reject(isEven, nums);
console.log(odds); // -> [1, 3, 5, 7, 9]
```

## Documentation

[Documentation](https://github.com/jasonsbarr/functional/tree/main/docs/iterable)
