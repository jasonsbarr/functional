import {
  append,
  at,
  chain,
  concat,
  concatToArray,
  copy,
  copyWithin,
  each,
  eachWithIndex,
  filter,
  first,
  flatten,
  last,
  length,
  map,
  prepend,
  reduce,
  reduceRight,
  reject,
  toArray,
} from "../../utils/iter.js";
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
  append(item) {
    return append(item, this);
  }

  // returns Option, not simple value
  at(i) {
    return at(i, this);
  }

  chain(fn) {
    return chain(fn, this);
  }

  // works with any iterable in this library, but assumption is all args are lists
  concat(...lists) {
    return concat(this, ...lists);
  }

  concatToArray(...lists) {
    return concatToArray(this, ...lists);
  }

  copy() {
    return copy(this);
  }

  copyWithin(target, start, end) {
    return copyWithin(this, target, start, end);
  }

  each(fn) {
    each(fn, this);
  }

  eachWithIndex(fn) {
    eachWithIndex(fn, this);
  }

  filter(pred) {
    return filter(pred, this);
  }

  // returns Option, not value
  first() {
    return first(this);
  }

  flatten() {
    return flatten(this);
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

  // returns Option, not value
  get(i) {
    return this.at(i);
  }

  isCons() {
    return true;
  }

  isList() {
    return this.kind === "List";
  }

  // returns Option, not value
  last() {
    return last(this);
  }

  map(fn) {
    return map(fn, this);
  }

  // returns Option, not value
  pop() {
    return this.last();
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

  // returns Option, not value
  shift() {
    return this.first();
  }

  toArray() {
    return toArray(this);
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

  // unlike the array method, this does NOT mutate the current object
  unshift(item) {
    return this.prepend(item);
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

export const cons = (car, cdr) => new Cons(car, cdr);

export const List = (...args) => {
  if (
    args.length === 0 ||
    args[0] == null ||
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

export const list = List;

// constructs a list from any iterable
List.of = (iter) => List(...iter);

List.isList = (obj) => obj.kind === "List";
