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

  all(pred) {
    return false;
  }

  any(pred) {
    return false;
  }

  append(item) {
    return list(item);
  }

  at(i) {
    return None(null);
  }

  chain(fn) {
    return this;
  }

  concat(...others) {
    const [first, ...rest] = others;
    return list(...first).concat(...rest);
  }

  copy() {
    return this;
  }

  copyWithin() {
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

  get(i) {
    return None(null);
  }

  includes(value) {
    return false;
  }

  indexOf(value, start = 0) {
    return None(null);
  }

  inspect() {
    return this.toString();
  }

  isCons() {
    return false;
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

  pluck(numItems) {
    return this;
  }

  pop() {
    return None(null);
  }

  prepend(item) {
    return list(item);
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

  reverse() {
    return this;
  }

  shift() {
    return None(null);
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

  take(numItems) {
    return this.pluck(numItems);
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

  unshift(item) {
    return list(item);
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
