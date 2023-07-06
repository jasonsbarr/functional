import { curryN } from "@jasonsbarr/functional-core/lib/lambda/curryN.js";
import { gte } from "@jasonsbarr/functional-core/lib/predicates/gte.js";
import { isInt } from "@jasonsbarr/functional-core/lib/predicates/isInt.js";
import { isNegative } from "@jasonsbarr/functional-core/lib/predicates/isNegative.js";
import { isPositive } from "@jasonsbarr/functional-core/lib/predicates/isPositive.js";
import { isZero } from "@jasonsbarr/functional-core/lib/predicates/isZero.js";
import { lte } from "@jasonsbarr/functional-core/lib/predicates/lte.js";

class Range {
  constructor(start, end, step = 1) {
    if (isZero(step) || !isInt(step)) {
      throw new Error("Range step must be a positive or negative integer");
    }

    if (gte(start, end) && isPositive(step)) {
      throw new Error(
        "If step is positive, end number must be greater than start number"
      );
    }

    if (lte(start, end) && isNegative(step)) {
      throw new Error(
        "If step is negative, start number must be greater than end number"
      );
    }

    this._start = start;
    this._end = end;
    this._step = step;
  }

  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }

  get step() {
    return this._step;
  }

  [Symbol.iterator]() {
    let i = this.start;
    const end = this.end;
    const step = this.step;
    return {
      next() {
        if (step > 0) {
          if (i < end) {
            const j = i;
            i += step;
            return {
              value: j,
              done: false,
            };
          }
          return { done: true };
        } else if (step < 0) {
          if (i > end) {
            const j = i;
            i += step;
            return {
              value: j,
              done: false,
            };
          }
          return { done: true };
        }
        throw new Error("something broke lol");
      },
    };
  }

  toString() {
    return `Range: [${this.start}...${this.end} by ${this.step}]`;
  }

  inspect() {
    return this.toString();
  }
}

export const range = (...args) => {
  let start,
    end,
    step = 1;

  if (args.length === 1) {
    start = 1;
    end = args[0];
  } else if (args.length === 2) {
    start = args[0];
    end = args[1];
  } else if (args.length === 3) {
    start = args[0];
    end = args[1];
    step = args[2];
  } else {
    throw new Error("range function must take 1, 2, or 3 arguments");
  }

  return new Range(start, end, step);
};

export default range;
