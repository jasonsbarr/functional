import { curry } from "./functions";
import { isNil } from "./nil";

// Iterable functions used for iterable collection types
// Only guaranteed to work with iterable collections from this library
// These work because return value is created with iter.constructor

// stolen from https://stackoverflow.com/a/32538867
export const isIterable = (obj) =>
  !isNil(obj) && typeof obj[Symbol.iterator] === "function";

export const toArray = (iter) => [...iter];

export const concatToArray = (...iters) =>
  iters.reduce((arr, iter) => arr.concat([...iter]), []);

export const each = curry((fn, iter) => {
  for (let item of iter) {
    fn(item);
  }
});

export const eachWithIndex = curry((fn, iter) => {
  let i = 0;
  for (let item of iter) {
    fn(item, i);
    i++;
  }
});

export const map = curry((fn, iter) => {
  let temp = [];
  for (let item of iter) {
    temp.push(fn(item));
  }
  return iter.constructor(...temp);
});

export const filter = curry((pred, iter) => {
  let temp = [];
  for (let item of iter) {
    if (pred(item)) {
      temp.push(item);
    }
  }
  return temp.length ? iter.constructor(...temp) : iter.constructor();
});

export const reject = curry((pred, iter) => {
  let temp = [];
  for (let item of iter) {
    if (!pred(item)) {
      temp.push(item);
    }
  }
  return temp.length ? iter.constructor(...temp) : iter.constructor();
});

export const reduce = curry((fn, initial, iter) => {
  let acc = initial;
  for (let item of iter) {
    acc = fn(acc, item);
  }
  return acc;
});

export const fold = reduce;
export const foldLeft = reduce;

export const reduceRight = curry((fn, initial, iter) => {
  const temp = [...iter];
  return temp.reduceRight(fn, initial);
});

export const foldRight = reduceRight;
