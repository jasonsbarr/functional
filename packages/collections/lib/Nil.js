import { zip } from "@jasonsbarr/iterable/lib/zip.js";
import { None } from "@jasonsbarr/functional-core/lib/types/Option.js";
import { List } from "./List.js";

class NilClass {
  constructor() {
    Object.defineProperty(this, "type", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: "Nil",
    });

    Object.defineProperty(this, "constructor", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Nil,
    });
  }

  all(search) {
    return false;
  }

  any(search) {
    return false;
  }

  ap(functor) {
    return this;
  }

  append(item) {
    return List(item);
  }

  at(i) {
    return None(null);
  }

  atUnsafe(i) {
    return null;
  }

  atWithDefault(i, defaultValue) {
    return defaultValue;
  }

  average() {
    return None(null);
  }

  chain(fn) {
    return this;
  }

  clone() {
    return this;
  }

  concat(...others) {
    const [first, ...rest] = others;
    return first.concat(...rest);
  }

  count(search) {
    return 0;
  }

  copy() {
    return this;
  }

  copyWithin() {
    return this;
  }

  difference(other) {
    return this;
  }

  each(fn) {}

  eachWithIndex(fn) {}

  empty() {
    return Nil.empty();
  }

  entries() {
    return [];
  }

  equals(other) {
    return typeof other.isNil === "function" && other.isNil();
  }

  every(pred) {
    return this.all(pred);
  }

  exclude(pred) {
    return this.reject(pred);
  }

  filter(pred) {
    return this;
  }

  find(pred) {
    return None(null);
  }

  findIndex(pred) {
    return None(null);
  }

  first() {
    return None(null);
  }

  flat(level = Infinity) {
    return this;
  }

  flatten(level = Infinity) {
    return this;
  }

  flatMap(fn) {
    return this.chain(fn);
  }

  fold(fn, initial) {
    return initial;
  }

  foldLeft(fn, initial) {
    return initial;
  }

  foldRight(fn, initial) {
    return initial;
  }

  forEach(fn) {}

  from(i) {
    return this;
  }

  get(i) {
    return None(null);
  }

  has(value) {
    return this.includes(value);
  }

  includes(value) {
    return false;
  }

  indexOf(value, start = 0) {
    return None(null);
  }

  insert(item, i) {
    return List(item);
  }

  inspect() {
    return this.toString();
  }

  intersection(other) {
    return this;
  }

  isCons() {
    return false;
  }

  isEmpty() {
    return true;
  }

  isEqual(other) {
    return other.constructor.name === "Nil";
  }

  isList() {
    return true;
  }

  isNil() {
    return true;
  }

  join(sep = "") {
    return "";
  }

  keys() {
    return [];
  }

  last() {
    return None(null);
  }

  lastIndexOf(value, startIndex = 0) {
    return None(null);
  }

  map(fn) {
    return this;
  }

  mapWithIndex(fn) {
    return this;
  }

  max() {
    return None(null);
  }

  median() {
    return None(null);
  }

  min() {
    return None(null);
  }

  none() {
    return true;
  }

  pluck(numItems) {
    return this;
  }

  pop() {
    return None(null);
  }

  prepend(item) {
    return List(item);
  }

  product() {
    return None(null);
  }

  push(item) {
    return List(item);
  }

  reduce(fn, initial) {
    return initial;
  }

  reduceRight(fn, initial) {
    return initial;
  }

  reject(pred) {
    return this;
  }

  remove(search) {
    return this;
  }

  removeAt(start, end) {
    return this;
  }

  reverse() {
    return this;
  }

  sample() {
    return None(null);
  }

  sequence(point) {
    return this;
  }

  shift() {
    return None(null);
  }

  shuffle() {
    return this;
  }

  slice(start, end, step) {
    return this;
  }

  some(pred) {
    return false;
  }

  sort({ key = "", fn = null, reversed = false } = {}) {
    return this;
  }

  splice(start, deleteCount = 0, ...items) {
    if (!items.length) {
      return this;
    }
    return List.of(items);
  }

  sum() {
    return None(null);
  }

  symmetricDifference(other) {
    return other;
  }

  take(numItems) {
    return this;
  }

  takeWhile() {
    return this;
  }

  to(index) {
    return this;
  }

  toArray() {
    return [];
  }

  toJSON() {
    return JSON.stringify(null);
  }

  toString() {
    return "Nil()";
  }

  traverse() {
    return this;
  }

  union(other) {
    return other;
  }

  unique() {
    return this;
  }

  unshift(item) {
    return List(item);
  }

  update(updater, i) {
    return this;
  }

  values() {
    return [];
  }

  // unsafe - can contain null values
  zip(...iters) {
    return zip(...iters);
  }

  [Symbol.iterator]() {
    return {
      next() {
        return { done: true };
      },
    };
  }
}

export const Nil = () => new NilClass();

Nil.empty = () => NIL;

export const NIL = Nil();

export default NIL;
