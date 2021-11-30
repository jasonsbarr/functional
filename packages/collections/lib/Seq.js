import { isArray } from "@jasonsbarr/functional-core/lib/predicates/isArray.js";
import { isNil } from "@jasonsbarr/functional-core/lib/predicates/isNil.js";
import { isString } from "@jasonsbarr/functional-core/lib/predicates/isString.js";
import { isMap } from "@jasonsbarr/functional-core/lib/predicates/isMap.js";
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
    this.parent = null;

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

  root() {
    return this?.parent?.source;
  }

  take(num) {
    let i = 0;
    let result = [];

    for (let el of this) {
      if (i >= num) {
        break;
      }

      result.push(el);
      i++;
    }

    return Seq.of(result);
  }

  takeWhile(pred) {
    let result = [];

    for (let el of this) {
      if (!pred(el)) {
        break;
      }

      result.push(el);
    }

    return Seq.of(result);
  }

  toArray() {
    // DANGER: infinite Sequence will never terminate into an array
    return [...this];
  }

  toAsync() {
    return new AsyncSequence(this);
  }

  toJSON() {
    return JSON.stringify(this.toArray());
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

  take(num) {
    let i = 0;
    let result = [];

    for await (let el of this) {
      if (i >= num) {
        break;
      }

      result.push(el);
      i++;
    }

    return Seq.of(result).toAsync();
  }

  takeWhile(pred) {
    let result = [];

    for await (let el of this) {
      if (!pred(el)) {
        break;
      }

      result.push(el);
    }

    return Seq.of(result).toAsync();
  }
}

class MappedAsyncSequence extends AsyncSequence {
  constructor(parent, mapFn) {
    super(parent.source);
    this.parent = parent;
    this.mapFn = mapFn;
  }
}

class FilteredAsyncSequence extends AsyncSequence {
  constructor(parent, filterFn) {
    super(parent.source);
    this.parent = parent;
    this.filterFn = filterFn;
  }
}

class ArrayWrapper extends Sequence {
  constructor(source) {
    super(source);
    this.parent = null;
  }
}

class MappedArrayWrapper extends ArrayWrapper {
  constructor(parent, mapFn) {
    super(parent.source);
    this.parent = parent;
    this.mapFn = mapFn;
  }
}

class FilteredArrayWrapper extends ArrayWrapper {
  constructor(parent, filterFn) {
    super(parent.source);
    this.parent = parent;
    this.filterFn = filterFn;
  }
}

class StringWrapper extends Sequence {}

class FunctionWrapper extends Sequence {
  constructor(sourceFn) {
    super([]);
    this.fn = sourceFn;
    this.parent = null;

     definePropWithOpts("size", this, {
      writable: false,
      enumerable: false,
      configurable: false,
      value: Infinity,
    });

    definePropWithOpts("length", this, {
      writable: false,
      enumerable: false,
      configurable: false,
      value: Infinity,
    });
  }

  *[Symbol.iterator]() {
    this.parent = Seq.of(this.fn());
    this.source = this.parent.source;
    this.size = isGeneratorObject(this.source) ? Infinity : this.source.length;
    this.length = this.size;

    if (this.size === Infinity) {
      let done = false;
      let v;

      while (!done) {
        v = this.source.next();
        done = v.done;

        if (!done) {
          yield v.value
        }
      }
    } else {
      let i = 0;

      while (i < this.size) {
        yield this.source[i++]
      }
    }
  }
}

class MappedFunctionWrapper extends FunctionWrapper {
  constructor(parent, mapFn) {
    super(parent.source);
    this.parent = parent;
    this.mapFn = mapFn;
  }
}

class FilteredFunctionWrapper extends FunctionWrapper {
  constructor(parent, filterFn) {
    super(parent.source);
    this.parent = parent;
    this.filterFn = filterFn;
  }
}

class EntriesWrapper extends Sequence {
  constructor(source) {
    super(entries(source));
    this.parent = null;
  }

  take(num) {
    let i = 0;
    let result = [];

    for (let pair of this) {
      if (i >= num) {
        break;
      }

      result.push(pair);
      i++;
    }

    return Seq.of(Map(...result));
  }

  takeWhile(pred) {
    let result = [];

    for (let [k, v] of this) {
      if (!pred(v, k)) {
        break;
      }

      result.push([k, v]);
    }

    return Seq.of(Map(...result));
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

class MappedEntriesSequence extends EntriesWrapper {
  constructor(parent, mapFn) {
    super(parent.source);
    this.parent = parent;
    this.mapFn = mapFn;
  }
}

class FilteredEntriesSequence extends EntriesWrapper {
  constructor(parent, filterFn) {
    super(parent.source);
    this.parent = parent;
    this.filterFn = filterFn;
  }
}

export const Seq = (...args) => Seq.of(args);

Seq.of = (source) => isNil(source) || length(source) === 0
  ? new ArrayWrapper([])
  : Dict.isDict(source) || Map.isMap(source) || isMap(source)
  ? new EntriesWrapper(source)
  : isArray(source)
  ? new ArrayWrapper(source)
  : isString(source)
  ? new StringWrapper(source)
  : isFunction(source)
  ? new FunctionWrapper(source)
  : length(source) === 1
  ? new ArrayWrapper([source[0]])
  : new Sequence(source);

Seq.from = Seq.of;
Seq.isSeq = (obj) => obj.type === "Seq";
Seq.empty = () => Seq.of([]);
Seq.async = (source) => Seq(source).toAsync();
Seq.fromObject = (source) => new EntriesWrapper(source);
