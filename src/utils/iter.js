import { Option, None, Some } from "../types/monads/Option.js";
import { curry } from "./function.js";
import { isNil } from "./nil.js";
import { equals } from "./equals.js";

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

// assumes all iterables are of the same kind, otherwise will construct an iterable of the same type as the first
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

// flattens completely or to specified level of depth
export const flatten = (iter, level = Infinity, current = 0) => {
  // iter.constructor(concatToArray(...iter));
  let result = [];
  each((item) => {
    if (isIterable(item) && typeof item !== "string" && current < level) {
      result = concatToArray(result, flatten(item, level, current + 1));
    } else {
      result.push(item);
    }
  }, iter);
  return iter.constructor(...result);
};
export const flat = flatten;

export const chain = curry((fn, iter) => map(fn, flatten(iter)));

export const flatMap = chain;

export const forEach = each;

// returns Option
export const get = at;

// works with any value, including objects
export const includes = curry((value, iter) => {
  for (let item of iter) {
    if (equals(item, value)) {
      return true;
    }
  }
  return false;
});

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

export const join = curry((sep, iter) => [...iter].join(sep));

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

export const compact = (iter) =>
  reject((item) => isNil(item) || Number.isNaN(item), iter);

export const reverse = (iter) => iter.constructor([...iter].reverse());

// returns Option
export const shift = first;

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
  if (end > length(iter)) end = length(iter) - 1;
  if (end < start) throw new Error("Start of slice must come before end");
  const tempStep = step > 0 ? step : -step;
  const temp = [...iter];

  for (let i = start; i < end; i += tempStep) {
    result.push(temp[i]);
  }

  if (step < 0) result.reverse();

  return iter.constructor(...result);
}

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

export const take = pluck;

export const toArray = (iter) => [...iter];

export const unshift = append;
