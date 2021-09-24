import { all } from "../core/iterable/all.js.js";
import { any } from "../core/iterable/any.js.js";
import { ap } from "../core/iterable/ap.js.js";
import { append } from "../core/iterable/append.js.js";
import { at } from "../core/iterable/at.js.js";
import { atUnsafe } from "../core/iterable/atUnsafe.js.js";
import { atWithDefault } from "../core/iterable/atWithDefault.js.js";
import { average } from "../core/iterable/average.js.js";
import { chain } from "../core/iterable/chain.js.js";
import { compact } from "../core/iterable/compact.js";
import { concat } from "../core/iterable/concat.js.js";
import { concatToArray } from "../core/iterable/concatToArray.js.js";
import { copy } from "../core/iterable/copy.js.js";
import { copyWithin } from "../core/iterable/copyWithin.js.js";
import { count } from "../core/iterable/count.js.js";
import { difference } from "../core/iterable/difference.js.js";
import { each } from "../core/iterable/each.js.js";
import { eachWithIndex } from "../core/iterable/eachWithIndex.js.js";
import { entries } from "../core/iterable/entries.js.js";
import { filter } from "../core/iterable/filter.js.js";
import { find } from "../core/iterable/find.js.js";
import { findIndex } from "../core/iterable/findIndex.js.js";
import { first } from "../core/iterable/first.js.js";
import { flatten } from "../core/iterable/flatten.js.js";
import { from } from "../core/iterable/from.js.js";
import { includes } from "../core/iterable/includes.js";
import { indexOf } from "../core/iterable/indexOf.js.js";
import { insert } from "../core/iterable/insert.js.js";
import { intersection } from "../core/iterable/intersection.js.js";
import { isEmpty } from "../core/iterable/isEmpty.js.js";
import { isEqual } from "../core/iterable/isEqual.js.js";
import { isNil } from "../core/predicates/isNil.js";
import { join } from "../core/iterable/join.js.js";
import { keys } from "../core/iterable/keys.js.js";
import { last } from "../core/iterable/last.js.js";
import { lastIndexOf } from "../core/iterable/lastIndexOf.js";
import { length } from "../core/iterable/length.js";
import { map } from "../core/iterable/map.js.js";
import { mapWithIndex } from "../core/iterable/mapWithIndex.js.js";
import { max } from "../core/iterable/max.js.js";
import { median } from "../core/iterable/median.js.js";
import { min } from "../core/iterable/min.js.js";
import { none } from "../core/iterable/none.js.js";
import { pluck } from "../core/iterable/pluck.js.js";
import { prepend } from "../core/iterable/prepend.js.js";
import { product } from "../core/iterable/product.js.js";
import { reduce } from "../core/iterable/reduce.js.js";
import { reduceRight } from "../core/iterable/reduceRight.js.js";
import { reject } from "../core/iterable/reject.js";
import { remove } from "../core/iterable/remove.js.js";
import { removeAt } from "../core/iterable/removeAt.js.js";
import { reverse } from "../core/iterable/reverse.js.js";
import { sample } from "../core/iterable/sample.js.js";
import { sequence } from "../core/iterable/sequence.js.js";
import { shuffle } from "../core/iterable/shuffle.js.js";
import { slice } from "../core/iterable/slice.js";
import { sort } from "../core/iterable/sort.js.js";
import { splice } from "../core/iterable/splice.js.js";
import { sum } from "../core/iterable/sum.js.js";
import { symmetricDifference } from "../core/iterable/symmetricDifference.js.js";
import { to } from "../core/iterable/to.js.js";
import { toArray } from "../core/iterable/toArray.js.js";
import { traverse } from "../core/iterable/traverse.js.js";
import { union } from "../core/iterable/union.js.js";
import { unique } from "../core/iterable/unique.js.js";
import { update } from "../core/iterable/update.js.js";
import { values } from "../core/iterable/values.js.js";
import { zip } from "../core/iterable/zip.js.js";
import { NIL } from "./Nil.js";
import { equals } from "../core/object/equals.js";

class Cons extends Array {
  constructor(car, cdr) {
    super(car, cdr);

    Object.defineProperty(this, "type", {
      configurable: false,
      enumerable: false,
      writable: true,
      value: "Cons",
    });

    Object.defineProperty(this, "constructor", {
      configurable: false,
      enumerable: false,
      writable: true,
      value: cons,
    });

    Object.defineProperty(this, "size", {
      configurable: false,
      enumerable: false,
      writable: true,
      value: length(this),
    });
  }

  // can use either a fluent method interface or use the iterable functions used here directly
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

  // may return null or undefined value
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
    return List.empty();
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

  isCons() {
    return true;
  }

  isEmpty() {
    return isEmpty(this);
  }

  isEqual(other) {
    return isEqual(this, other);
  }

  isList() {
    return this.type === "List";
  }

  isNil() {
    return length(this) !== 0;
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
    return pluck(numItems, this);
  }

  // returns Option, not value
  pop() {
    return this.last();
  }

  product() {
    return product(this);
  }

  prepend(item) {
    return prepend(item, this);
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
    return this.pluck(numItems);
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
    let arrStr = [...this].toString();
    let strArr = arrStr.split(",");
    let str =
      strArr.length == 2
        ? "'(" + strArr.join(" . ") + ")"
        : "'(" + strArr.join(" ") + ")";
    return str;
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

  update(i, updater) {
    return update(updater, i, this);
  }

  values() {
    return values(this);
  }

  // unsafe - may contain null values
  zip(...iters) {
    return zip(this, ...iters);
  }

  [Symbol.iterator]() {
    let head = this;
    let i = 0;

    return {
      next() {
        let value = head[i];
        if (value == null || value.constructor.name === "Nil") {
          return {
            done: true,
          };
        } else {
          if (head[1] instanceof Cons) {
            head = head[1];
            return {
              value,
              done: false,
            };
          } else {
            i++;
            return {
              value,
              done: false,
            };
          }
        }
      },
    };
  }
}

Cons.isCons = (obj) => typeof obj.isCons === "function" && obj.isCons();

export const cons = (car, cdr) => {
  let c = new Cons(car, cdr);
  if (cdr.type === "List") {
    c.type = "List";
  }
  return c;
};

export const List = (...args) => {
  if (
    args.length === 0 ||
    isNil(args[0]) ||
    args[0].constructor.name === "Nil"
  ) {
    return NIL;
  }

  let i = 0;
  let head = new Cons(args[i], NIL);
  let l = head;
  i++;
  while (i < args.length) {
    head[1] = new Cons(args[i], NIL);
    head = head[1];
    i++;
  }

  Object.defineProperty(l, "type", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: "List",
  });
  Object.defineProperty(l, "constructor", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: List,
  });
  Object.defineProperty(l, "size", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: length(l),
  });

  return l;
};

// constructs a list from any iterable
List.of = (iter) => List(...iter);
List.from = List.of;

List.isList = (obj) => obj.type === "List";

List.empty = () => NIL;

export const list = List;
