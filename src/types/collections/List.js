import { all } from "../../functions/iterable/all.js";
import { any } from "../../functions/iterable/any.js";
import { ap } from "../../functions/iterable/ap.js";
import { append } from "../../functions/iterable/append.js";
import { at } from "../../functions/iterable/at.js";
import { atUnsafe } from "../../functions/iterable/atUnsafe.js";
import { atWithDefault } from "../../functions/iterable/atWithDefault.js";
import { concat } from "../../functions/iterable/concat.js";
import { concatToArray } from "../../functions/iterable/concatToArray.js";
import { copy } from "../../functions/iterable/copy.js";
import { count } from "../../functions/iterable/count.js";
import { length } from "../../functions/iterable/length.js";
import { map } from "../../functions/iterable/map.js";
import {
  chain,
  copyWithin,
  each,
  eachWithIndex,
  entries,
  filter,
  first,
  flatten,
  last,
  prepend,
  reduce,
  reduceRight,
  reject,
  toArray,
  find,
  findIndex,
  includes,
  indexOf,
  join,
  lastIndexOf,
  reverse,
  sort,
  splice,
  slice,
  pluck,
  average,
  unique,
  difference,
  from,
  insert,
  intersection,
  isEmpty,
  isEqual,
  max,
  median,
  min,
  none,
  product,
  remove,
  removeAt,
  sample,
  shuffle,
  sum,
  symmetricDifference,
  to,
  union,
  mapWithIndex,
  zip,
  update,
  ap,
  keys,
  values,
} from "../../functions/iter.js";
import { isNil } from "../../functions/helpers/isNil.js";
import { NIL } from "./Nil.js";

class Cons extends Array {
  constructor(car, cdr) {
    super(car, cdr);

    Object.defineProperty(this, "kind", {
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

  entries() {
    return entries(this);
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
    return this.kind === "List";
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
  if (cdr.kind === "List") {
    c.kind === "List";
  }
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

  Object.defineProperty(l, "kind", {
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

List.isList = (obj) => obj.kind === "List";

export const list = List;
