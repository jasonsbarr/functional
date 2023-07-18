# Array Functions

Assume function is curried unless otherwise stated.

Note that none of these functions mutate their arguments. A new value is always created and returned.

## array

When given a single numeric argument, it creates an array with that many empty items. Given a sequence of arguments, it creates an array with those elements.

- `array(...args)`

Import:

```js
import { array } from "@jasonsbarr/functional-core/";
```

Usage:

```js
const arr = array(3); // -> [undefined, undefined, undefined]
const nums = array(1, 2, 3, 4, 5); // -> [1, 2, 3, 4, 5]
```

## arrayFrom

Given `mapFn` and an iterable, constructs an array mapping the elements of the iterable.

- `arrayFrom(mapFn, iterable)`

Import:

```js
import { arrayFrom } from "@jasonsbarr/functional-core/lib/array/arrayFrom";
```

Usage:

```js
const squares = arrayFrom((x) => x * x, [1, 2, 3, 4, 5]); // -> [1, 4, 9, 16, 25]
```

## concat

Concatenates 2 or more arrays. Curried for up to 2 arrays, so will partially apply if given 1 array.

- `concat(...arrs)`

Import:

```js
import { concat } from "@jasonsbarr/functional-core/lib/array/concat";
```

Usage:

```js
const nums = concat([1], [2], [3]); // -> [1, 2, 3]
```

## copyWithin

Shallow copies part of an array to another location in the same array without modifying its length.

- `copyWithin(target, start, end, arr)`

Import:

```js
import { copyWithin } from "@jasonsbarr/functional-core/lib/array/copyWithin";
```

Usage:

```js
const arr = ["a", "b", "c", "d", "e"];
// copy the element at 3 to index 0
copyWithin(0, 3, 4, arr); // -> ["d", "b", "c", "d", "e"]
```

## entries

Returns an iterator of the key, value pairs of the original array's entries

- `entries(arr)`

Import:

```js
import { entries } from "@jasonsbarr/functional-core/lib/array/entries";
```

Usage:

```js
const es = entries(["a", "b", "c"]);
es.next().value; // [0, "a"]
```

# every

Returns `true` if every element in the array is `true` for the `predicate` function.

- `every(predicate, arr)`

Import:

```js
import { every } from "@jasonsbarr/functional-core/lib/array/every";
```

Usage:

```js
import { isNumber } from "@jasonsbarr/functional-core/lib/predicates/isNumber";
every(isNumber, [1, 2, 3, "a"]); // -> false
```

## fill

Fills all elements in `arr` from `start` to `end` (non-inclusive) with a static `value`.

- `fill(value, start, end, arr)`

Import:

```js
import { fill } from "@jasonsbarr/functional-core/lib/array/fill";
```

Usage:

```js
fill(0, 0, 2, [1, 2, 3, 4]); // -> [0, 0, 3, 4]
```

## filter

Returns a new array with all the elements of `arr` that are true for `predicate`.

- `filter(predicate, arr)`

Import:

```js
import { filter } from "@jasonsbarr/functional-core/lib/array/filter";
```

Usage:

```js
import { isString } from "@jasonsbarr/functional-core/lib/predicates/isString";

filter(isString, [1, 2, "hello", 3, "world"]); // -> ["hello", "world"]
```

## find

Returns an `Option` of the value being searched for.

- `find(predicate, arr)`

Import:

```js
import { find } from "@jasonsbarr/functional-core/lib/array/find";
```

Usage:

```js
find(3, [1, 2, 3, 4]); // -> Some(3)
```

## findIndex

Returns an `Option` of the index of the value being searched for.

- `findIndex(predicate, arr)`

Import:

```js
import { findIndex } from "@jasonsbarr/functional-core/lib/array/findIndex";
```

Usage:

```js
findIndex(3, [1, 2, 3, 4]); // -> Some(2)
```

## flat

Flattens an array completely.

- `flat(arr)`

Import:

```js
import { flat } from "@jasonsbarr/functional-core/lib/array/flat";
```

Usage:

```js
flat([1, [2, 3, [4]]]); // -> [1, 2, 3, 4]
```

## flatMap

- `flatMap(mapFn, arr)`

Import:

```js
import { flatMap } from from "@jasonsbarr/functional-core/lib/array/flatMap";
```

Usage:

```js
flatMap((x) => x * x, [1, [2, 3, [4]]]); //-> [1, 4, 9, 16]
```

## flatN

Flattens an array by `n` levels.

- `flatN(n, arr)`

Import:

```js
import { flatN } from "@jasonsbarr/functional-core/lib/array/flatN";
```

Usage:

```js
flatN(1, [1, [2, 3, [4]]]); // -> [1, 2, 3, [4]]
```

## forEach

Execute `fn` for each element of the array. Used for performing side effects. To return a transformed version of the array, use `map`.

- `forEach(fn, arr)`

Import:

```js
import { forEach } from from "@jasonsbarr/functional-core/lib/array/forEach";
```

Usage:

```js
forEach((elem) => console.log(elem), [1, 2, 3]);
// 1
// 2
// 3
```

## includes

Check if `arr` includes `value` from the beginning.

- `includes(value, arr)`

Import:

```js
import { includes } from "@jasonsbarr/functional-core/lib/array/includes";
```

Usage:

```js
includes(3, [1, 2, 3, 4]); // -> true
```

## includesFrom

Check if `arr` includes `value` starting with `fromIndex`.

- `includesFrom(value, fromIndex, arr)`

Import:

```js
import { includesFrom } from "@jasonsbarr/functional-core/lib/array/includesFrom";
```

Usage:

```js
includesFrom(3, 3, [1, 2, 3, 4]); // -> false
```

## indexOf

Returns a `Some` of the index in `arr` at which `value` is found, `None` if it is not found. Starts from the beginning of the array.

- `indexOf(value, arr)`

Import:

```js
import { indexOf } from "@jasonsbarr/functional-core/lib/array/indexOf";
```

Usage:

```js
indexOf("b", ["a", "b", "c"]); // -> Some(1)
```

## indexOfFrom

Returns an `Option` of the index in `arr` at which `value` is found, starting from `fromIndex`.

- `indexOfFrom(value, fromIndex, arr)`

Import:

```js
import { indexOfFrom } from "@jasonsbarr/functional-core/lib/array/indexOfFrom";
```

Usage:

```js
indexOfFrom("b", 2, ["a", "b", "c"]); // -> None
```

## join

Joins the elements of `arr` into a string, each element separated by `sep`.

- `join(sep, arr)`

Import:

```js
import { join } from "@jasonsbarr/functional-core/lib/array/join";
```

Usage:

```js
join("-", ["a", "b", "c"]); // -> a-b-c
```

## keys

Returns an iterator of the keys of `arr`.

- `keys(arr)`

Import:

```js
import { keys } from "@jasonsbarr/functional-core/lib/array/keys";
```

Usage:

```js
const ks = keys([1, 2, 3]);
for (let k of ks) {
  console.log(k);
}
// 0
// 1
// 2
```

## lastIndexOf

Returns an `Option` of the last index in `arr` at which `value` is found.

- `lastIndexOf(value, arr)`

Import:

```js
import { lastIndexOf } from "@jasonsbarr/functional-core/lib/array/lastIndexOf";
```

Usage:

```js
lastIndexOf(2, [1, 2, 3, 2]); // -> Some(3)
```

## lastIndexOfFrom

Returns an `Option` of the last index in `arr` at which `value` is found, starting at `fromIndex`.

- `lastIndexOfFro(value, fromIndex, arr)`

Import:

```js
import { lastIndexOfFrom } from "@jasonsbarr/functional-core/lib/array/lastIndexOfFrom";
```

Usage:

```js
lastIndexOfFrom(3, 3, [1, 2, 3, 2]); // -> None
```

## length

Returns the length of an array.

- `length(arr)`

Import:

```js
import { length } from "@jasonsbarr/functional-core/lib/array/length";
```

Usage:

```js
length([1, 2, 3]); // -> 3
```

## map

Uses `fn` to map the values of an array, returning a new array.

- `map(fn, arr)`

Import:

```js
import { map } from "@jasonsbarr/functional-core/lib/array/map";
```

Usage:

```js
map((x) => x * x, [1, 2, 3, 4]); // -> [1, 4, 9, 16]
```

## of

Takes an iterable and returns an array from it.

- `of(iterable)`

Import:

```js
import { of } from "@jasonsbarr/functional-core/lib/array/of";
```

Usage:

```js
const m = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
of(values(m)); // -> [1, 2, 3]
```

## pop

Returns an `Option` of the last value in an array. Does _not_ mutate the array.

- `pop(arr)`

Import:

```js
import { pop } from "@jasonsbarr/functional-core/lib/array/pop";
```

Usage:

```js
pop([1, 2, 3]); // -> Some(3)
```

## push

Pushes a new item onto the end of an array and returns the array. Returns a new array, does not mutate the original.

- `push(item, arr)`

Import:

```js
import { push } from "@jasonsbarr/functional-core/lib/array/push";
```

Usage:

```js
const nums = [1, 2, 3];
push(4, nums); // -> [1, 2, 3, 4]
```

## reduce

Accumulates the values in an array into a single value using `reducer`, starting with `initial` as the value.

- `reduce(reducer, initial, arr)`

Import:

```js
import { reduce } from "@jasonsbarr/functional-core/lib/array/reduce";
```

Usage:

```js
reduce((sum, n) => sum + n, 0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // -> 55
```

## reduceRight

Same as `reduce`, but iterates from the end of the array to the beginning.

- `reduceRight(reducer, initial, arr)`

Import:

```js
import { reduceRight } from "@jasonsbarr/functional-core/lib/array/reduceRight";
```

Usage:

```js
reduceRight((sum, n) => sum + n, 0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // -> 55
```

## reverse

Returns a reversed copy of the array.

- `reverse(arr)`

Import:

```js
import { reverse } from "@jasonsbarr/functional-core/lib/array/reverse";
```

Usage:

```js
reverse([1, 2, 3]); // -> [3, 2, 1]
```

## shift

Takes the first value in the array, returns an `Option`. Does _not_ mutate the array.

- `shift(arr)`

```js
import { shift } from "@jasonsbarr/functional-core/lib/array/";
```

Usage:

```js
shift([1, 2, 3]); // -> Some(1)
```

## slice

Copies part of an array, from `start` to `end` (non-inclusive).

- `slice(start, end, arr)`

Import:

```js
import { slice } from "@jasonsbarr/functional-core/lib/array/slice";
```

Usage:

```js
slice(2, 4, [1, 2, 3, 4, 5]); // -> [3, 4]
```

## some

Returns `true` if any element in the array is `true` for `predicate`.

- `some(predicate, arr)`

Import:

```js
import { some } from "@jasonsbarr/functional-core/lib/array/some";
```

Usage:

```js
import { isEven } from "@jasonsbarr/functional-core/lib/predicates/isEven";
some(isEven, [1, 3, 5, 6, 7]); // -> true
```

## sort

Returns a sorted copy of the array. Sorts numbers correctly, unlike the native JavaScript array sort.

- `sort(arr)`

Import:

```js
import { sort } from "@jasonsbarr/functional-core/lib/array/sort";
```

Usage:

```js
sort([3, 2, 6, 4, 1, 5]); // -> [1, 2, 3, 4, 5, 6]
```

## sortBy

Returns a copy of the array sorted by `sortFn`.

- `sortBy(sortFn)`

Import:

```js
import { sortBy } from "@jasonsbarr/functional-core/lib/array/sortBy";
```

Usage:

```js
const arr = [
  { name: "Jason", age: 41 },
  { name: "Daniel", age: 8 },
  { name: "Gretchen", age: 37 },
];

sortBy((a, b) => a.age - b.age, arr);

/*
    [
        { name: "Daniel", age: 8 },
        { name: "Gretchen", age: 37 },
        { name: "Jason", age: 41 }
    ];
 */
```

## splice

Insert a value into an array while also deleting zero or more elements at the index at which you're inserting. Returns a new array; does not mutate the original.

- `splice(start, deleteCount, item, arr)`

Import:

```js
import { splice } from "@jasonsbarr/functional-core/lib/array/splice";
```

Usage:

```js
splice(2, 1, 2, [1, 2, 3, 4]); // -> [1, 2, 2, 4]
```

## unshift

Insert `item` onto the beginning of the array, increasing its size by 1. Does not mutate the array, but returns a new array.

- `unshift(item, arr)`

Import:

```js
import { unshift } from "@jasonsbarr/functional-core/lib/array/unshift";
```

Usage:

```js
unshift(0, [1, 2, 3]); // -> [0, 1, 2, 3]
```

## values

Returns an iterator of the values of an array.

- `values(arr)`

Import:

```js
import { values } from "@jasonsbarr/functional-core/lib/array/values";
```

Usage:

```js
for (let v of values([1, 2, 3, 4])) {
  console.log(v);
}
// 1
// 2
// 3
// 4
```
