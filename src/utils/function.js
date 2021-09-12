import { isIterable } from "./iter.js";

export const identity = (x) => x;

export const noop = () => {};

// stolen from https://github.com/adobe/ferrum/blob/6434098c7f8ca6cb31a6bbe54dff3d1026a25f2d/src/functional.js#L109
export const pipeline = (val, ...fns) => fns.reduce((v, fn) => fn(v), val);

// stolen from https://github.com/adobe/ferrum/blob/6434098c7f8ca6cb31a6bbe54dff3d1026a25f2d/src/functional.js#L129
export const pipe =
  (...fns) =>
  (val) =>
    pipeline(val, ...fns);

// right-to-left composition of functions
export const compose =
  (...fns) =>
  (val) =>
    fns.reduceRight((v, fn) => fn(v), val);

export const thunk = (fn) => {
  let value;
  let computed = false;

  return () => {
    if (computed) {
      return value;
    }
    computed = true;
    value = fn();
    return value;
  };
};

// stolen from https://github.com/origamitower/folktale/blob/master/packages/base/source/helpers/defer.js
export const defer =
  typeof setImmediate !== "undefined"
    ? (f) => setImmediate(f)
    : typeof process !== "undefined"
    ? (f) => process.nextTick(f)
    : (f) => setTimeout(f, 0);

// Returns a single array of the function args based on whether the first arg is an iterable object
export const getArrayFromArgs = (...args) =>
  isIterable(args[0]) && typeof args[0] !== "string" ? [...args[0]] : args;

// curry functions and their dependencies stolen from Ramda
const _arity = (n, fn) => {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error(
        "First argument to _arity must be a non-negative integer no greater than ten"
      );
  }
};

const _isPlaceholder = (a) => {
  return (
    a != null && typeof a === "object" && a["@@functional/placeholder"] === true
  );
};

const _curry1 = (fn) => {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};

const _curry2 = (fn) => {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a)
          ? f2
          : _curry1(function (_b) {
              return fn(a, _b);
            });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b)
          ? f2
          : _isPlaceholder(a)
          ? _curry1(function (_a) {
              return fn(_a, b);
            })
          : _isPlaceholder(b)
          ? _curry1(function (_b) {
              return fn(a, _b);
            })
          : fn(a, b);
    }
  };
};

const _curryN = (length, received, fn) => {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (
        combinedIdx < received.length &&
        (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)
      ) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0
      ? fn.apply(this, combined)
      : _arity(left, _curryN(length, combined, fn));
  };
};

export const curryN = _curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});

export const curry = _curry1(function curry(fn) {
  return curryN(fn.length, fn);
});
