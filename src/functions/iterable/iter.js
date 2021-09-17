import { Option, None, Some } from "../../types/Option.js";
import { curry } from "../lambda/curry.js";
import { isNil } from "../helpers/isNil.js";
import { equals } from "../object/equals.js";
import { randInt } from "../math/randInt.js";

// Iterable functions used for iterable collection types
// Only guaranteed to work with arrays and iterable collections from this library
// These work because return value is created with iter.constructor
// Most functions that take multiple arguments are curried

// export const groupBy = () => {};

export const some = any;

// assumes all items in iterable are of same type, based on first item in iterable
// because why would you want to sort a list of different types? That would be dumb.
// Give either a key or a function, but not both. If you give both, it will use the function.
export const sort = (iter, { key = "", fn = null, reversed = false } = {}) => {
  let temp = [...iter];
  if (fn) {
    temp.sort(fn);
  } else if (typeof temp[0] === "number") {
    temp.sort((a, b) => a - b);
  } else if (typeof temp[0] === "boolean") {
    temp.sort((a, b) => (a === b ? 0 : a ? -1 : 1));
  } else if (key) {
    if (typeof temp[0][key] === "number") {
      temp.sort((a, b) => a[key] - b[key]);
    } else if (typeof temp[0][key] === "boolean") {
      temp.sort((a, b) => (a[key] === b[key] ? 0 : a[key] ? -1 : 1));
    } else if (typeof temp[0][key] === "string") {
      temp.sort((a, b) => (a[key] > b[key] ? 1 : a[key] === b[key] ? 0 : -1));
    }
  } else {
    temp.sort();
  }
  return reversed
    ? iter.constructor(...temp.reverse())
    : iter.constructor(...temp);
};

export const splice = (iter, start = 0, deleteCount = 0, ...items) => {
  let temp = [...iter];
  temp.splice(start, deleteCount, ...items);
  return iter.constructor(...temp);
};

export const removeAt = (iter, start, end = length(iter) - 1) => {
  if (end > length(iter) - 1) end = length(iter) - 1;
  return splice(iter, start, end - start);
};

export const insert = curry((item, i, iter) => splice(iter, i, 0, item));

export const sum = (iter) =>
  length(iter) === 0 ? None(null) : Some(reduce((s, c) => s + c, 0, iter));

export const symmetricDifference = (iter1, iter2) => {
  let set1 = new Set([...iter1]);
  let set2 = new Set([...iter2]);
  for (let item of set2) {
    if (set1.has(item)) {
      set1.delete(item);
    } else {
      set1.add(item);
    }
  }
  return iter1.constructor(...set1);
};

export const take = pluck;

export const to = curry((index, iter) => slice(iter, 0, index, 1));

export const toArray = (iter) => [...iter];

export const union = (iter1, iter2) => {
  let set1 = new Set([...iter1]);
  let set2 = new Set([...iter2]);
  for (let item of set2) {
    set1.add(item);
  }
  return iter1.constructor(...set1);
};

export const unique = (iter) => iter.constructor(...[...new Set([...iter])]);

export const unshift = prepend;

// updater should take an Option
export const update = curry((updater, i, iter) =>
  splice(
    iter,
    i,
    1,
    updater(
      get(i, iter).fold(
        (x) => x,
        (x) => x
      )
    )
  )
);

export const values = (iter) => [...iter].values();

// unsafe - can return null values
// use only when you know all iters are the same length
export const zip = (...iters) =>
  mapWithIndex((_, i) => {
    return map(
      (iter) =>
        get(i, iter).fold(
          (_) => null,
          (x) => x
        ),
      iters
    );
  }, iters[0]);
