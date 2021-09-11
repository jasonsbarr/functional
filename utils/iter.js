import { Option, None, Some } from "../types/monads/Option.js";
import { curry } from "./functions.js";
import { isNil } from "./nil.js";

// Iterable functions used for iterable collection types
// Only guaranteed to work with arrays and iterable collections from this library
// These work because return value is created with iter.constructor
// Most functions that take multiple arguments are curried

// stolen from https://stackoverflow.com/a/32538867
export const isIterable = (obj) =>
  !isNil(obj) && typeof obj[Symbol.iterator] === "function";

export const all = curry((pred, iter) =>
  [...iter].reduce((acc, v) => acc && pred(v), true)
);

export const any = curry((pred, iter) =>
  [...iter].reduce((acc, v) => acc || pred(v), false)
);

export const append = curry((item, iter) => iter.constructor(item, ...iter));

// Returns Option, not value
export const at = curry((i, iter) => {
  const temp = [...iter];
  return Option.of(i < 0 ? temp[temp.length - i] : temp[i]);
});

export const chain = curry((fn, iter) => map(fn, flatten(iter)));

// assumes all iterables are of the same kind
export const concat = (...iters) =>
  iter[0].constructor(concatToArray(...iters));

export const concatToArray = (...iters) =>
  iters.reduce((arr, iter) => arr.concat([...iter]), []);

export const copy = (iter) => iter.constructor(...[...iter]);

// have to do data-first due to optional arguments
export const copyWithin = (iter, target, start, end) =>
  iter.constructor(...[...iter].copyWithin(target, start, end));

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

export const entries = (iter) => [...iter].entries();

export const every = any;

export const filter = curry((pred, iter) => {
  let temp = [];
  for (let item of iter) {
    if (pred(item)) {
      temp.push(item);
    }
  }
  return temp.length ? iter.constructor(...temp) : iter.constructor();
});

// returns Option
export const find = curry((pred, iter) => {
  for (let item of iter) {
    if (pred(item)) {
      return Some(item);
    }
  }
  return None(null);
});

// returns Option
export const findIndex = curry((pred, iter) => {
  let i = 0;
  for (let item of iter) {
    if (pred(item)) {
      return Some(i);
    }
    i++;
  }
  return None(null);
});

// Returns Option
export const first = at(0);

export const flatMap = chain;

// flattens by one level only
export const flat = flatten;
export const flatten = (iter) => iter.constructor(concatToArray(...iter));

export const forEach = each;

// returns Option
export const get = at;

// returns option
export const last = (iter) => at(length(iter) - 1, iter);

export const length = (iter) => [...iter].length;

export const map = curry((fn, iter) => {
  let temp = [];
  for (let item of iter) {
    temp.push(fn(item));
  }
  return iter.constructor(...temp);
});

// returns Option
export const pop = last;

export const prepend = curry((item, iter) => iter.constructor(item, ...iter));

export const push = append;

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

export const reject = curry((pred, iter) => {
  let temp = [];
  for (let item of iter) {
    if (!pred(item)) {
      temp.push(item);
    }
  }
  return temp.length ? iter.constructor(...temp) : iter.constructor();
});

// returns Option
export const shift = first;

export const some = any;

export const toArray = (iter) => [...iter];

export const unshift = append;
