import { Option, None, Some } from "../../types/Option.js";
import { curry } from "../lambda/curry.js";
import { isNil } from "../helpers/isNil.js";
import { equals } from "../object/equals.js";
import { randInt } from "../math/randInt.js";

// Iterable functions used for iterable collection types
// Only guaranteed to work with arrays and iterable collections from this library
// These work because return value is created with iter.constructor
// Most functions that take multiple arguments are curried

export const forEach = eachWithIndex;

// returns Option
export const get = at;

// export const groupBy = () => {};

// works with any value, including objects
export const includes = curry((value, iter) => {
  for (let item of iter) {
    if (equals(item, value)) {
      return true;
    }
  }
  return false;
});

export const has = includes;

// data-first because of optional argument, returns Option, works with any value including objects
export const indexOf = (iter, value, start = 0) => {
  let i = 0;
  for (let item of iter) {
    if (i <= start && equals(item, value)) {
      return Some(i);
    }
    i++;
  }
  return None(null);
};

export const intersection = (iter1, iter2) => {
  let set1 = new Set([...iter1]);
  let set2 = new Set([...iter2]);
  let result = [];
  for (let item of set2) {
    if (set1.has(item)) {
      result.push(item);
    }
  }
  return iter1.constructor(...result);
};

export const isEqual = curry((iter1, iter2) => equals(iter1, iter2));

export const join = curry((sep, iter) => [...iter].join(sep));

export const keys = (iter) => [...iter].keys();

// returns option
export const last = (iter) => at(length(iter) - 1, iter);

// returns Option, data-first because of optional argument
export const lastIndexOf = (iter, value, startIndex = length(iter) - 1) => {
  const temp = [...iter];
  for (let i = startIndex; i >= 0; i--) {
    if (equals(temp[i], value)) {
      return Some(i);
    }
  }
  return None(null);
};

export const isEmpty = (iter) => {
  return length(iter) === 0;
};

export const mapWithIndex = curry((fn, iter) => {
  let temp = [];
  let i = 0;
  for (let item of iter) {
    temp.push(fn(item, i));
    i++;
  }
  return iter.constructor(...temp);
});

// returns Option
export const median = (iter) => {
  const temp = [...iter];
  const mid = Math.floor(temp.length / 2);
  temp.sort((a, b) => a - b);
  return Option.of(
    temp.length % 2 === 0 ? (temp[mid - 1] + temp[mid]) / 2 : temp[mid]
  );
};

export const none = (search, iter) => {
  for (let item of iter) {
    if (typeof search === "function") {
      if (search(item)) return false;
    } else if (search instanceof RegExp) {
      if (search.test(item)) return false;
    } else {
      if (equals(search, item)) return false;
    }
  }
  return true;
};

// returns Option
export const pop = last;

export const prepend = curry((item, iter) => iter.constructor(item, ...iter));

export const push = append;

export const fold = reduce;
export const foldLeft = reduce;

// returns Option
export const average = (iter) =>
  length(iter) === 0
    ? None(null)
    : Some(reduce((sum, i) => sum + i, 0, iter) / length(iter));

// returns Option
export const max = (iter) =>
  length(iter) === 0
    ? None(null)
    : Some(reduce((big, cur) => (big > cur ? big : cur), -Infinity, iter));

export const min = (iter) =>
  length(iter) === 0
    ? None(null)
    : Some(reduce((small, cur) => (small < cur ? small : cur), Infinity, iter));

export const product = (iter) =>
  length(iter) === 0
    ? None(null)
    : Some(reduce((prod, cur) => prod * cur, 1, iter));

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

export const exclude = reject;

export const compact = (iter) =>
  reject((item) => isNil(item) || Number.isNaN(item), iter);

export const remove = curry((search, iter) => {
  let result = [];
  for (let item of iter) {
    if (typeof search === "function") {
      if (!search(item)) result.push(item);
    } else if (search instanceof RegExp) {
      if (!search.test(item)) result.push(item);
    } else {
      if (!equals(search, item)) result.push(item);
    }
  }
  return iter.constructor(...result);
});

export const reverse = (iter) => iter.constructor([...iter].reverse());

export const sample = (iter) => at(randInt(0, length(iter) - 1), iter);

// Fisher-Yates shuffle algorithm, from https://stackoverflow.com/a/2450976
export const shuffle = (iter) => {
  let temp = [...iter];
  let currentIndex = length(iter),
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [temp[currentIndex], temp[randomIndex]] = [
      temp[randomIndex],
      temp[currentIndex],
    ];
  }
  return iter.constructor(...temp);
};

export function slice(iter, start, end, step) {
  const args = compact([...arguments]).slice(1);
  let result = [];
  if (args.length === 0) {
    return iter.constructor(...iter);
  }
  if (args.length === 1) {
    end = args[0];
    start = 0;
  }
  step = step || 1;
  if (start < 0) start = length(iter) + start;
  if (end < 0) end = length(iter) + end;
  if (end > length(iter) - 1) end = length(iter) - 1;
  if (end < start) throw new Error("Start of slice must come before end");
  const tempStep = step > 0 ? step : -step;
  const temp = [...iter];

  for (let i = start; i < end; i += tempStep) {
    result.push(temp[i]);
  }

  if (step < 0) result.reverse();

  return iter.constructor(...result);
}

export const from = (i, iter) => slice(iter, i, length(iter) - 1, 1);

export const pluck = (numItems, iter) => slice(iter, 0, numItems, 1);

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
