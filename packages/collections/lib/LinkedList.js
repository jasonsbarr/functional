import { definePropWithOpts } from "@jasonsbarr/functional-core/lib/object/definePropWithOpts.js";
import { isNil } from "@jasonsbarr/functional-core/lib/predicates/isNil.js";
import { all } from "@jasonsbarr/iterable/lib/all.js";
import { any } from "@jasonsbarr/iterable/lib/any.js";
import { ap } from "@jasonsbarr/iterable/lib/ap.js";
import { append } from "@jasonsbarr/iterable/lib/append.js";
import { at } from "@jasonsbarr/iterable/lib/at.js";
import { atUnsafe } from "@jasonsbarr/iterable/lib/atUnsafe.js";
import { atWithDefault } from "@jasonsbarr/iterable/lib/atWithDefault.js";
import { average } from "@jasonsbarr/iterable/lib/average.js";
import { chain } from "@jasonsbarr/iterable/lib/chain.js";
import { compact } from "@jasonsbarr/iterable/lib/compact.js";
import { concat } from "@jasonsbarr/iterable/lib/concat.js";
import { concatToArray } from "@jasonsbarr/iterable/lib/concatToArray.js";
import { copy } from "@jasonsbarr/iterable/lib/copy.js";
import { copyWithin } from "@jasonsbarr/iterable/lib/copyWithin.js";
import { count } from "@jasonsbarr/iterable/lib/count.js";
import { difference } from "@jasonsbarr/iterable/lib/difference.js";
import { each } from "@jasonsbarr/iterable/lib/each.js";
import { eachWithIndex } from "@jasonsbarr/iterable/lib/eachWithIndex.js";
import { equals } from "@jasonsbarr/functional-core/lib/object/equals.js";
import { entries } from "@jasonsbarr/iterable/lib/entries.js";
import { filter } from "@jasonsbarr/iterable/lib/filter.js";
import { find } from "@jasonsbarr/iterable/lib/find.js";
import { findIndex } from "@jasonsbarr/iterable/lib/findIndex.js";
import { first } from "@jasonsbarr/iterable/lib/first.js";
import { flatten } from "@jasonsbarr/iterable/lib/flatten.js";
import { from } from "@jasonsbarr/iterable/lib/from.js";
import { includes } from "@jasonsbarr/iterable/lib/includes.js";
import { indexOf } from "@jasonsbarr/iterable/lib/indexOf.js";
import { insert } from "@jasonsbarr/iterable/lib/insert.js";
import { intersection } from "@jasonsbarr/iterable/lib/intersection.js";
import { isEmpty } from "@jasonsbarr/iterable/lib/isEmpty.js";
import { isEqual } from "@jasonsbarr/iterable/lib/isEqual.js";
import { join } from "@jasonsbarr/iterable/lib/join.js";
import { keys } from "@jasonsbarr/iterable/lib/keys.js";
import { last } from "@jasonsbarr/iterable/lib/last.js";
import { lastIndexOf } from "@jasonsbarr/iterable/lib/lastIndexOf.js";
import { map } from "@jasonsbarr/iterable/lib/map.js";
import { mapWithIndex } from "@jasonsbarr/iterable/lib/mapWithIndex.js";
import { max } from "@jasonsbarr/iterable/lib/max.js";
import { none } from "@jasonsbarr/iterable/lib/none.js";
import { median } from "@jasonsbarr/iterable/lib/median.js";
import { min } from "@jasonsbarr/iterable/lib/min.js";
import { pluck } from "@jasonsbarr/iterable/lib/pluck.js";
import { prepend } from "@jasonsbarr/iterable/lib/prepend.js";
import { product } from "@jasonsbarr/iterable/lib/product.js";
import { reduce } from "@jasonsbarr/iterable/lib/reduce.js";
import { reduceRight } from "@jasonsbarr/iterable/lib/reduceRight.js";
import { reject } from "@jasonsbarr/iterable/lib/reject.js";
import { remove } from "@jasonsbarr/iterable/lib/remove.js";
import { removeAt } from "@jasonsbarr/iterable/lib/removeAt.js";
import { reverse } from "@jasonsbarr/iterable/lib/reverse.js";
import { sample } from "@jasonsbarr/iterable/lib/sample.js";
import { sequence } from "@jasonsbarr/iterable/lib/sequence.js";
import { shuffle } from "@jasonsbarr/iterable/lib/shuffle.js";
import { slice } from "@jasonsbarr/iterable/lib/slice.js";
import { sort } from "@jasonsbarr/iterable/lib/sort.js";
import { splice } from "@jasonsbarr/iterable/lib/splice.js";
import { sum } from "@jasonsbarr/iterable/lib/sum.js";
import { symmetricDifference } from "@jasonsbarr/iterable/lib/symmetricDifference.js";
import { take } from "@jasonsbarr/iterable/lib/take.js";
import { takeWhile } from "@jasonsbarr/iterable/lib/takeWhile.js";
import { to } from "@jasonsbarr/iterable/lib/to.js";
import { toArray } from "@jasonsbarr/iterable/lib/toArray.js";
import { traverse } from "@jasonsbarr/iterable/lib/traverse.js";
import { union } from "@jasonsbarr/iterable/lib/union.js";
import { unique } from "@jasonsbarr/iterable/lib/unique.js";
import { update } from "@jasonsbarr/iterable/lib/update.js";
import { values } from "@jasonsbarr/iterable/lib/values.js";
import { zip } from "@jasonsbarr/iterable/lib/zip.js";

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DLList {
  constructor(...args) {
    let head = null;
    let tail = null;
    let length = 0;

    for (let arg of args) {
      let node = new Node(arg);

      if (!head) {
        head = node;
        tail = node;
      } else {
        tail.next = node;
        node.prev = tail;
        tail = node;
      }

      length++;
    }

    this.head = head;
    this.tail = tail;

    definePropWithOpts("length", this, {
      writable: false,
      configurable: false,
      enumerable: false,
      value: length,
    });

    definePropWithOpts("size", this, {
      writable: false,
      configurable: false,
      enumerable: false,
      value: length,
    });

    definePropWithOpts("constructor", this, {
      writable: false,
      configurable: false,
      enumerable: false,
      value: LinkedList,
    });

    definePropWithOpts("type", this, {
      writable: false,
      configurable: false,
      enumerable: false,
      value: "LinkedList",
    });
  }

  [Symbol.iterator]() {
    let current = this.head;

    return {
      next() {
        if (isNil(current)) {
          return { done: true };
        }

        let value = current.value;
        current = current.next;

        return { value, done: false };
      },
    };
  }

  all(search) {
    return all(search, this);
  }

  any(search) {
    return any(search, this);
  }

  ap(functor) {
    return ap(functor, this);
  }

  append(item) {
    return append(item, this);
  }

  // returns Option, not simple value
  at(i) {
    return at(i, this);
  }

  // unsafe - may return null or undefined value
  atUnsafe(i) {
    return atUnsafe(i, this);
  }

  atWithDefault(i, defaultValue) {
    return atWithDefault(i, defaultValue, this);
  }

  average() {
    return average(this);
  }

  chain(fn) {
    return chain(fn, this);
  }

  clone() {
    return this.copy();
  }

  compact() {
    return compact(this);
  }

  // works with any iterable in this library, but assumption is all args are lists
  concat(...lists) {
    return concat(this, ...lists);
  }

  concatToArray(...lists) {
    return concatToArray(this, ...lists);
  }

  count(search) {
    return count(search, this);
  }

  // makes a shallow copy
  copy() {
    return copy(this);
  }

  copyWithin(target, start, end) {
    return copyWithin(this, target, start, end);
  }

  difference(other) {
    return difference(this, other);
  }

  each(fn) {
    each(fn, this);
  }

  eachWithIndex(fn) {
    eachWithIndex(fn, this);
  }

  empty() {
    return Tuple.empty();
  }

  entries() {
    return entries(this);
  }

  equals(other) {
    return equals(this, other);
  }

  every(pred) {
    return this.all(pred);
  }

  exclude(pred) {
    return this.reject(pred);
  }

  filter(pred) {
    return filter(pred, this);
  }

  // returns Option
  find(pred) {
    return find(pred, this);
  }

  // returns Option
  findIndex(pred) {
    return findIndex(pred, this);
  }

  // returns Option, not value
  first() {
    return first(this);
  }

  flat(level = Infinity) {
    return this.flatten(level);
  }

  flatten(level = Infinity) {
    return flatten(this, level);
  }

  flatMap(fn) {
    return this.chain(fn);
  }

  fold(fn, initial) {
    return this.reduce(fn, initial);
  }

  foldLeft(fn, initial) {
    return this.reduce(fn, initial);
  }

  foldRight(fn, initial) {
    return this.reduceRight(fn, initial);
  }

  forEach(fn) {
    this.eachWithIndex(fn);
  }

  from(i) {
    return from(i, this);
  }

  // returns Option, not value
  get(i) {
    return this.at(i);
  }

  has(value) {
    return this.includes(value);
  }

  includes(value) {
    return includes(value, this);
  }

  // returns Option
  indexOf(value, start = 0) {
    return indexOf(this, value, start);
  }

  insert(item, i) {
    return insert(item, i, this);
  }

  inspect() {
    return this.toString();
  }

  intersection(other) {
    return intersection(this, other);
  }

  isEmpty() {
    return isEmpty(this);
  }

  isEqual(other) {
    return isEqual(this, other);
  }

  isTuple() {
    return true;
  }

  join(sep = "") {
    return join(sep, this);
  }

  keys() {
    return keys(this);
  }

  // returns Option, not value
  last() {
    return last(this);
  }

  // returns Option
  lastIndexOf(value, startIndex = this.size) {
    return lastIndexOf(this, value, startIndex);
  }

  map(fn) {
    return map(fn, this);
  }

  mapWithIndex(fn) {
    return mapWithIndex(fn, this);
  }

  max() {
    return max(this);
  }

  median() {
    return median(this);
  }

  min() {
    return min(this);
  }

  none(search) {
    return none(search, this);
  }

  pluck(numItems) {
    return pluck(this, numItems);
  }

  // returns Option, not value
  pop() {
    return this.last();
  }

  prepend(item) {
    return prepend(item, this);
  }

  product() {
    return product(this);
  }

  // unlike the array method, this does NOT mutate the current object
  push(item) {
    return this.append(item);
  }

  reduce(fn, initial) {
    return reduce(fn, initial, this);
  }

  reduceRight(fn, initial) {
    return reduceRight(fn, initial, this);
  }

  reject(pred) {
    return reject(pred, this);
  }

  remove(search) {
    return remove(search, this);
  }

  removeAt(start, end) {
    return removeAt(this, start, end);
  }

  reverse() {
    return reverse(this);
  }

  sample() {
    return sample(this);
  }

  sequence(point) {
    return sequence(point, this);
  }

  // returns Option, not value
  shift() {
    return this.first();
  }

  shuffle() {
    return shuffle(this);
  }

  slice(start, end, step) {
    return slice(this, start, end, step);
  }

  some(pred) {
    return this.any(pred);
  }

  sort({ key = "", fn = null, reversed = false } = {}) {
    return sort(this, { key, fn, reversed });
  }

  splice(start, deleteCount = 0, ...items) {
    return splice(this, start, deleteCount, ...items);
  }

  sum() {
    return sum(this);
  }

  symmetricDifference(other) {
    return symmetricDifference(this, other);
  }

  take(numItems) {
    return take(numItems, this);
  }

  takeWhile(pred) {
    return takeWhile(pred, this);
  }

  to(index) {
    return to(index, this);
  }

  toArray() {
    return toArray(this);
  }

  toJSON() {
    return JSON.stringify(this.toArray());
  }

  toString() {
    return `LinkedList(${[...this].toString().split(",").join(", ")})`;
  }

  traverse(point, fn) {
    return traverse(point, fn, this);
  }

  union(other) {
    return union(this, other);
  }

  unique() {
    return unique(this);
  }

  // unlike the array method, this does NOT mutate the current object
  unshift(item) {
    return this.prepend(item);
  }

  update(updater, i) {
    return update(updater, i, this);
  }

  values() {
    return values(this);
  }

  // unsafe - may contain null values
  zip(...iters) {
    return zip(this, ...iters);
  }
}

export const LinkedList = (...args) => new DLList(...args);

LinkedList.of = (arr) => LinkedList(...arr);
LinkedList.from = LinkedList.of;
LinkedList.isLinkedList = (obj) => obj.type === "LinkedList";
LinkedList.empty = () => LinkedList.of([]);

export default LinkedList;
