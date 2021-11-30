import { isArray } from "@jasonsbarr/functional-core/lib/predicates/isArray.js";
import { isNil } from "@jasonsbarr/functional-core/lib/predicates/isNil.js";
import { isString } from "@jasonsbarr/functional-core/lib/predicates/isString.js";
import { isNumber } from "@jasonsbarr/functional-core/lib/predicates/isNumber.js";
import { isBool } from "@jasonsbarr/functional-core/lib/predicates/isBool.js";
import { isSymbol } from "@jasonsbarr/functional-core/lib/predicates/isSymbol.js";
import { isMap } from "@jasonsbarr/functional-core/lib/predicates/isMap.js";
import { isSet } from "@jasonsbarr/functional-core/lib/predicates/isSet.js";
import { isDate } from "@jasonsbarr/functional-core/lib/predicates/isDate.js";
import { isRegExp } from "@jasonsbarr/functional-core/lib/predicates/isRegExp.js";
import { isObject } from "@jasonsbarr/functional-core/lib/predicates/isObject.js";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction.js";
import { isGeneratorObject } from "@jasonsbarr/functional-core/lib/predicates/isGeneratorObject.js";
import { definePropWithOpts } from "@jasonsbarr/functional-core/lib/object/definePropWithOpts.js";
import { entries } from "@jasonsbarr/functional-core/lib/object/entries.js";
import { length } from "@jasonsbarr/functional-core/lib/array/length.js";
import { JsMap } from "./internal/_JsMap.js";
import { Map } from "./Map.js";
import { Dict } from "./Dict.js";

class Sequence {
  constructor(source) {
    this.source = source;

    definePropWithOpts("size", this, {
      writable: false,
      enumerable: false,
      configurable: false,
      value: isGeneratorObject(source) ? Infinity : source.length,
    });

    definePropWithOpts("length", this, {
      writable: false,
      enumerable: false,
      configurable: false,
      value: this.size,
    });

    definePropWithOpts("type", this, {
      writable: false,
      enumerable: false,
      configurable: false,
      value: "Seq",
    });
  }

  *[Symbol.iterator]() {
    if (this.size === Infinity) {
      let done = false;
      let v;

      while (!done) {
        v = this.source.next();
        done = v.done;

        if (!done) {
          yield v.value;
        }
      }
    } else {
      let i = 0;

      while (i < this.source.length) {
        yield this.source[i++];
      }
    }
  }

  isAsync() {
    return isFunction(this[Symbol.asyncIterator]);
  }

  toArray() {
    // DANGER: infinite Sequence will never terminate into an array
    return [...this];
  }

  toAsync() {
    return new AsyncSequence(this);
  }
}

class AsyncSequence extends Sequence {
  constructor(parent) {
    super(parent.source);
    this.parent = parent;
  }

  async *[Symbol.asyncIterator]() {
    if (this.size === Infinity) {
      let done = false;
      let v;

      while (!done) {
        v = this.source.next();
        done = v.done;

        if (!done) {
          yield v.value;
        }
      }
    } else {
      let i = 0;

      while (i < this.source.length) {
        yield this.source[i++];
      }
    }
  }
}

class MappedSequence extends Sequence {
  constructor(parent, mapFn) {
    super(parent.source);
    this.parent = parent;
    this.mapFn = mapFn;
  }
}

class FilteredSequence extends Sequence {
  constructor(parent, filterFn) {
    super(parent.source);
    this.parent = parent;
    this.filterFn = filterFn;
  }
}

class ArrayWrapper extends Sequence {
  constructor(source) {
    super(source);
  }
}

class EntriesWrapper extends Sequence {
  constructor(source) {
    super(entries(source));
  }

  toJSMap() {
    return new JsMap(this.source);
  }

  toJSON() {
    return JSON.stringify(this.toObject());
  }

  toMap() {
    return Map(...this.source);
  }

  toObject() {
    return Object.fromEntries(this.source);
  }
}

export const Seq = (...args) => Seq.of(args);

Seq.of = (source) =>
  length(source) === 0
    ? new ArrayWrapper([])
    : length(source) === 1
    ? isArray(source[0])
      ? new ArrayWrapper(source)
      : isNil(source[0])
      ? new ArrayWrapper([])
      : isString(source[0]) ||
        isNumber(source[0]) ||
        isBool(source[0]) ||
        isSymbol(source[0]) ||
        isDate(source[0]) ||
        isRegExp(source[0]) ||
        isObject(source[0])
      ? new ArrayWrapper([source[0]])
      : isSet(source)
      ? new ArrayWrapper([...source[0]])
      : isMap(source[0]) || Map.isMap(source[0]) || Dict.isDict(source[0])
      ? new EntriesWrapper(source[0])
      : Seq.isSeq(source[0])
      ? source[0]
      : new Sequence(source[0])
    : new Sequence(source);

Seq.from = Seq.of;
Seq.isSeq = (obj) => obj.type === "Seq";
Seq.empty = () => Seq.of([]);
Seq.async = (source) => Seq(source).toAsync();
Seq.fromObject = (source) => new EntriesWrapper(source);
