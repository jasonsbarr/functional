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

class ArrayLikeSequence extends Sequence {
  constructor(source) {
    super(source);
  }
}

class ArrayWrapper extends ArrayLikeSequence {
  constructor(source) {
    super(source);
  }
}

class EntriesWrapper extends Sequence {
  constructor(source) {
    super(entries(source));
  }
}

export const Seq = (...args) => Seq.of(args);

Seq.of = (source) =>
  isArray(source)
    ? new ArrayWrapper(source)
    : isNil(source)
    ? new ArrayWrapper([])
    : isString(source) ||
      isNumber(source) ||
      isBool(source) ||
      isSymbol(source) ||
      isDate(source) ||
      isRegExp(source) ||
      isObject(source)
    ? new ArrayWrapper([source])
    : isSet(source)
    ? new ArrayWrapper([...source])
    : isMap(source) || Map.isMap(source) || Dict.isDict(source)
    ? new EntriesWrapper(source)
    : Seq.isSeq(source)
    ? source
    : new Sequence(source);

Seq.from = Seq.of;
Seq.isSeq = (obj) => obj.type === "Seq";
Seq.empty = () => Seq.of([]);
Seq.async = (source) => Seq(source).toAsync();
Seq.fromObject = (source) => new EntriesWrapper(source);
