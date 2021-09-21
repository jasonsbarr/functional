import { curryN } from "../functions/lambda/curryN.js";
import { gte } from "../functions/predicates/gte.js";
import { isInt } from "../functions/predicates/isInt.js";
import { isNegative } from "../functions/predicates/isNegative.js";
import { isPositive } from "../functions/predicates/isPositive.js";
import { isZero } from "../functions/predicates/isZero.js";
import { lte } from "../functions/predicates/lte.js";

class RangeClass {
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

export const Range = curryN(
  2,
  (start, end, step = 1) => new RangeClass(start, end, step)
);

export const range = Range;
