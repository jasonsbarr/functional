import { isArray } from "@jasonsbarr/functional-core/lib/predicates/isArray.js";
import { isNil } from "@jasonsbarr/functional-core/lib/predicates/isNil.js";
import { isMap } from "@jasonsbarr/functional-core/lib/predicates/isMap.js";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction.js";
import { isGeneratorObject } from "@jasonsbarr/functional-core/lib/predicates/isGeneratorObject.js";
import { definePropWithOpts } from "@jasonsbarr/functional-core/lib/object/definePropWithOpts.js";
import { entries } from "@jasonsbarr/functional-core/lib/object/entries.js";
import { length } from "@jasonsbarr/functional-core/lib/array/length.js";
import { equals } from "@jasonsbarr/functional-core";
import { Option } from "@jasonsbarr/functional-core";
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

  apply(source) {
    let root = this.root();
    let prevSource = root.source;
    let result = [];

    try {
      root.source = source;
      result = this.toArray();
    } finally {
      root.source = prevSource;
    }

    return result;
  }

  concat(...others) {
    // DANGER: will hang with infinite sequence
    return Seq.of(...this, ...others);
  }

  each(fn) {
    let i = 0;

    for (let el of this) {
      if (fn(el, i++) === false) {
        return false;
      }
    }

    return true;
  }

  equals(other) {
    // DANGER: will hang with infinite sequence
    if (!Seq.isSeq(other)) {
      return false;
    }

    let seq1 = this.toArray();
    let seq2 = other.toArray();

    if (seq1.length !== seq2.length) {
      return false;
    }

    for (let i = 0; i < seq1.length; i++) {
      if (!equals(seq1[i], seq2[i])) {
        return false;
      }
    }

    return true;
  }

  filter(fn) {
    return new FilteredSequence(this, fn);
  }

  get(i) {
    let ele;

    this.each((e, idx) => {
      if (idx === i) {
        ele = e;
        return false;
      }
    });
    return Option.of(ele);
  }

  isAsync() {
    return isFunction(this[Symbol.asyncIterator]);
  }

  map(fn) {
    return new MappedSequence(this, fn);
  }

  reduce(reducer, init) {
    let acc = init;

    for (let el of this) {
      acc = reducer(acc, el);
    }

    return acc;
  }

  reject(fn) {
    return this.filter((el) => !fn(el));
  }

  root() {
    return this?.parent ?? Seq.of([]);
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

  toEntries() {
    return new EntriesWrapper(this.source);
  }

  toAsync() {
    return new AsyncSequence(this);
  }

  toJSMap() {
    return this.toEntries().toJSMap();
  }

  toJSON() {
    return JSON.stringify(this.toArray());
  }

  toMap() {
    return this.toEntries().toMap();
  }

  toObject() {
    return this.toEntries().toObject();
  }
}

class MappedSequence extends Sequence {
  constructor(parent, mapFn) {
    super(parent.source);
    this.parent = parent;
    this.mapFn = mapFn;
  }

  each(fn) {
    const mapFn = this.mapFn;

    return this.parent.each((e, i) => fn(mapFn(e, i), i));
  }

  take(num) {
    const mapFn = this.mapFn;
    const result = [];

    this.parent.each((e, i) => {
      if (i >= num) {
        return false;
      }
      result.push(mapFn(e));
    });

    return Seq.of(result);
  }

  takeWhile(pred) {
    const mapFn = this.mapFn;
    const result = [];

    this.parent.each((e, i) => {
      if (!pred(e)) {
        return false;
      }
      result.push(mapFn(e));
    });

    return Seq.of(result);
  }
}

class FilteredSequence extends Sequence {
  constructor(parent, filterFn) {
    super(parent.source);
    this.parent = parent;
    this.filterFn = filterFn;
  }

  each(fn) {
    const filterFn = this.filterFn;
    const result = [];
    let j = 0;

    this.parent.each((e, i) => {
      if (filterFn(e)) {
        result.push(fn(e, j++));
      }
    });

    return Seq.of(result);
  }

  take(num) {
    const filterFn = this.filterFn;
    const result = [];
    let j = 0;

    this.parent.each((e, i) => {
      if (j >= num) {
        return false;
      }

      if (filterFn(e)) {
        result.push(e);
        j++;
      }
    });

    return Seq.of(result);
  }

  takeWhile(pred) {
    const filterFn = this.filterFn;
    const result = [];

    this.parent.each((e, i) => {
      if (!pred(e)) {
        return false;
      }

      if (filterFn(e)) {
        result.push(e);
      }
    });

    return Seq.of(result);
  }
}

class AsyncSequence extends Sequence {
  constructor(parent) {
    super(parent.source);
    this.parent = parent;
  }

  *[Symbol.asyncIterator]() {
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

  async each(fn) {
    let i = 0;

    for await (let el of this) {
      if (fn(el, i++) === false) {
        return false;
      }
    }

    return true;
  }

  filter(fn) {
    return new FilteredAsyncSequence(this, fn);
  }

  map(fn) {
    return new MappedAsyncSequence(this, fn);
  }

  reject(fn) {
    return this.filter((el) => !fn(el));
  }

  async take(num) {
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

  async takeWhile(pred) {
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

  async each(fn) {
    const mapFn = this.mapFn;

    return await this.parent.each((e, i) => fn(mapFn(e, i), i));
  }
}

class FilteredAsyncSequence extends AsyncSequence {
  constructor(parent, filterFn) {
    super(parent.source);
    this.parent = parent;
    this.filterFn = filterFn;
  }
}

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
          yield v.value;
        }
      }
    } else {
      let i = 0;

      while (i < this.size) {
        yield this.source[i++];
      }
    }
  }

  filter(fn) {
    return new FilteredFunctionWrapper(this, fn);
  }

  map(fn) {
    return new MappedFunctionWrapper(this, fn);
  }

  reject(fn) {
    return this.filter((el) => !fn(el));
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
    super(isArray(source) ? source : entries(source));
    this.parent = null;
  }

  each(fn) {
    let i = 0;

    for (let [k, v] of this) {
      if (fn(v, k, i++) === false) {
        return false;
      }
    }
    return true;
  }

  filter(fn) {
    return new FilteredEntriesSequence(this, fn);
  }

  map(fn) {
    return new MappedEntriesSequence(this, fn);
  }

  reject(fn) {
    return this.filter((v, k) => !fn(v, k));
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

  each(fn) {
    const mapFn = this.mapFn;

    return this.parent.each((v, k, i) => fn(mapFn(v, k, i)));
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

Seq.of = (source) =>
  isNil(source) || length(source) === 0
    ? new ArrayWrapper([])
    : Dict.isDict(source) || Map.isMap(source) || isMap(source)
    ? new EntriesWrapper(source)
    : isArray(source)
    ? new Sequence(source)
    : isFunction(source)
    ? new FunctionWrapper(source)
    : length(source) === 1
    ? Seq.of([source[0]])
    : new Sequence(source);

Seq.from = Seq.of;
Seq.isSeq = (obj) => obj.type === "Seq";
Seq.empty = () => Seq.of([]);
Seq.async = (source) => Seq(source).toAsync();
Seq.fromObject = (source) => new EntriesWrapper(source);
