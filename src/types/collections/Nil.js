import { zip, zipUnsafe } from "../../utils/iter";
import { None } from "../monads/Option";
import { list } from "./List";

class Nil {
  constructor() {
    Object.defineProperty(this, "kind", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: "Nil",
    });
  }

  all(search) {
    return false;
  }

  any(search) {
    return false;
  }

  append(item) {
    return list(item);
  }

  at(i) {
    return None(null);
  }

  average() {
    return 0;
  }

  chain(fn) {
    return this;
  }

  clone() {
    return this;
  }

  concat(...others) {
    const [first, ...rest] = others;
    return list(...first).concat(...rest);
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

  entries() {
    return [];
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
    return this.includes();
  }

  includes(value) {
    return false;
  }

  indexOf(value, start = 0) {
    return None(null);
  }

  insert(item, i) {
    return list(item);
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
    return list(item);
  }

  product() {
    return None(null);
  }

  push(item) {
    return list(item);
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

  sort({ key = "", fn = null, reversed = false }) {
    return this;
  }

  splice(start, deleteCount, ...items) {
    if (!items.length) {
      return this;
    }
    return list.of(items);
  }

  sum() {
    return None(null);
  }

  symmetricDifference(other) {
    return this;
  }

  take(numItems) {
    return this.pluck(numItems);
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

  union(other) {
    return other;
  }

  unique() {
    return this;
  }

  unshift(item) {
    return list(item);
  }

  update(updater, i) {
    return this;
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

export const NIL = new Nil();
