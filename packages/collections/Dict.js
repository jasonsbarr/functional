import { all } from "../core/dict/all.js.js";
import { any } from "../core/dict/any.js.js";
import { append } from "../core/dict/append.js.js";
import { compact } from "../core/dict/compact.js.js";
import { clear } from "../core/dict/clear.js.js";
import { concat } from "../core/dict/concat.js.js";
import { copy } from "../core/dict/copy.js.js";
import { definePropWithOpts } from "../core/object/definePropWithOpts.js.js";
import { deleteValue } from "../core/dict/deleteValue.js.js";
import { entries } from "../core/object/entries.js";
import { equals } from "../core/object/equals.js";
import { index } from "../core/dict/dictIndex.js.js";
import { clone } from "../core/object/clone.js.js";
import { each } from "../core/dict/each.js.js";
import { eachWithKey } from "../core/dict/eachWithKey.js.js";
import { filter } from "../core/dict/filter.js.js";
import { filterKeys } from "../core/dict/filterKeys.js.js";
import { first } from "../core/dict/first.js.js";
import { freeze } from "../core/object/freeze.js.js";
import { get } from "../core/dict/get.js.js";
import { getWithDefault } from "../core/dict/getWithDefault.js.js";
import { has } from "../core/dict/has.js.js";
import { hash } from "../core/object/hash.js.js";
import { keys } from "../core/object/keys.js.js";
import { last } from "../core/dict/last.js.js";
import { length } from "../core/iterable/length.js";
import { map } from "../core/dict/map.js.js";
import { mapEntries } from "../core/dict/mapEntries.js.js";
import { mapKeys } from "../core/dict/mapKeys.js.js";
import { merge } from "../core/dict/merge.js.js";
import { reduce } from "../core/dict/reduce.js.js";
import { reduceRight } from "../core/dict/reduceRight.js";
import { reject } from "../core/dict/reject.js.js";
import { reverse } from "../core/dict/reverse.js.js";
import { set } from "../core/dict/set.js.js";
import { toMap } from "../core/dict/toMap.js.js";
import { toObject } from "../core/dict/toObject.js.js";
import { toQueryString } from "../core/dict/toQueryString.js.js";
import { update } from "../core/dict/update.js.js";
import { values } from "../core/object/values.js.js";
import { concatToArray } from "../core/iterable/concatToArray.js.js";
import { fromEntries } from "../core/object/fromEntries.js.js";
import { count } from "../core/dict/count.js.js";
import { find } from "../core/dict/find.js.js";
import { findKey } from "../core/dict/findKey.js.js";
import { findEntry } from "../core/dict/findEntry.js.js";
import { join } from "../core/dict/join.js.js";
import { none } from "../core/dict/none.js.js";
import { pluck } from "../core/dict/pluck.js.js";
import { prepend } from "../core/dict/prepend.js.js";
import { removeByKey } from "../core/dict/removeByKey.js.js";
import { removeByValue } from "../core/dict/removeByValue.js.js";
import { identity } from "../core/helpers/identity.js.js";
import { sort } from "../core/dict/sort.js.js";

// Dictionaries work best when all the keys are one type and all the values are one type
// like any JS object, keys can only be strings or symbols
class Dictionary {
  constructor(entries) {
    // entries can be any object that works with this iteration
    // e.g. an Array of pairs or a Map, or even an Object with entries called on it
    for (let [k, v] of entries) {
      this[k] = v;
    }

    definePropWithOpts("size", this, {
      enumerable: false,
      writable: false,
      value: length(keys(this)),
    });

    definePropWithOpts("type", this, {
      enumerable: false,
      writable: false,
      configurable: false,
      value: "Dictionary",
    });

    definePropWithOpts("constructor", this, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Dict,
    });

    freeze(this);
  }

  all(search) {
    return all(search, this);
  }

  any(search) {
    return any(search, this);
  }

  ap(other) {
    return this.chain((f) => other.map(f));
  }

  append(item) {
    return Dict.of(append(item, this));
  }

  chain(fn) {
    return Dict.of(map(fn, this.flatten()));
  }

  clear() {
    return Dict.of(clear(this));
  }

  // deep copy
  clone() {
    return Dict.of(clone(this));
  }

  compact() {
    return Dict.of(compact(this));
  }

  concat(other) {
    return Dict.of(concat(this, other));
  }

  // shallow copy
  copy() {
    return Dict.of(copy(this));
  }

  count(search) {
    return count(search, this);
  }

  delete(key) {
    return Dict.of(deleteValue(key, this));
  }

  each(fn) {
    each(fn, this);
  }

  eachWithKey(fn) {
    eachWithKey(fn, this);
  }

  empty() {
    return this.clear();
  }

  entries() {
    return entries(this);
  }

  equals(other) {
    return equals(this, other);
  }

  exclude(pred) {
    return this.reject(pred);
  }

  filter(pred) {
    return Dict.of(filter(pred, this));
  }

  filterKeys(pred) {
    return Dict.of(filterKeys(pred, this));
  }

  find(pred) {
    return find(pred, this);
  }

  findEntry(pred) {
    return findEntry(pred, this);
  }

  findKey(pred) {
    return findKey(pred, this);
  }

  first() {
    return first(this);
  }

  flatMap(fn) {
    return this.chain(fn);
  }

  // items with the same key will resolve to the last item's value
  flatten(level = Infinity) {
    return Dict.of(fromEntries(flattenEntries(entries(this))));

    function flattenEntries(es, current = 0) {
      let result = [];
      for (let [key, value] of es) {
        if (Dict.isDict(value) && current < level) {
          result = concatToArray(
            result,
            flattenEntries(entries(value), current + 1)
          );
        } else {
          result.push([key, value]);
        }
      }
      return result;
    }
  }

  fold(fn, initial) {
    return this.reduce(fn, initial);
  }

  foldLeft(fn, initial) {
    return this.reduce(fn, initial);
  }

  foldRight(fn, initial) {
    return this.reduceRight(fn, initial);
  }

  forEach(fn) {
    this.eachWithKey(fn);
  }

  // returns Option
  get(key) {
    return get(key, this);
  }

  getWithDefault(key, defaultValue) {
    return getWithDefault(key, defaultValue, this);
  }

  has(key) {
    return has(key, this);
  }

  hash() {
    return hash(this);
  }

  hashEquals(other) {
    return hash(this) === hash(other);
  }

  // returns Option
  index(value) {
    return index(value, this);
  }

  isEmpty() {
    return equals(this, Dict.empty());
  }

  join(sep = "") {
    return join(sep, this);
  }

  keys() {
    return keys(this);
  }

  last() {
    return last(this);
  }

  map(fn) {
    return Dict.of(map(fn, this));
  }

  mapEntries(fn) {
    return mapEntries(fn, this);
  }

  mapKeys(fn) {
    return Dict.of(mapKeys(fn, this));
  }

  merge(...others) {
    return Dict.of(merge(this, ...others));
  }

  none(search) {
    return none(search, this);
  }

  pluck(numItems) {
    return Dict.of(pluck(numItems, this));
  }

  prepend(item) {
    return Dict.of(prepend(item, this));
  }

  reduce(fn, initial) {
    return reduce(fn, initial, this);
  }

  reduceRight(fn, initial) {
    return reduceRight(fn, initial, this);
  }

  reject(pred) {
    return Dict.of(reject(pred, this));
  }

  removeByKey(key) {
    return Dict.of(removeByKey(key, this));
  }

  removeByValue(value) {
    return Dict.of(removeByValue(value, this));
  }

  reverse() {
    return Dict.of(reverse(this));
  }

  sequence(point) {
    return this.sequence(point, identity);
  }

  set(key, value) {
    return Dict.of(set(key, value, this));
  }

  sort({ key = "", fn = null, reverse = false } = {}) {
    return sort(this, { key, fn, reverse });
  }

  toJSON() {
    return JSON.stringify(this.toObject());
  }

  toMap() {
    return toMap(this);
  }

  toObject() {
    return toObject(this);
  }

  toQueryString() {
    return toQueryString(this);
  }

  traverse(point, fn) {
    return this.reduce(
      (acc, v, k) =>
        fn(v, k)
          .map((x) => (y) => y.merge({ [k]: x }))
          .ap(acc),
      point(Dict.empty())
    );
  }

  unset(key) {
    return this.delete(key);
  }

  update(key, updater) {
    return Dict.of(update(key, updater, this));
  }

  values() {
    return values(this);
  }

  valueOf() {
    return this.toObject();
  }

  toString() {
    let str = "Dictionary: {\n";
    let i = 0;
    for (let [k, v] of this) {
      str += `  ${k} => ${v}`;
      if (i < this.size - 1) {
        str += ", ";
      }
      str += "\n";
    }
    str += "}";
    return str;
  }

  inspect() {
    return this.toString();
  }

  [Symbol.iterator]() {
    const pairs = entries(this);
    let i = 0;

    return {
      next() {
        if (i === pairs.length) {
          return { done: true };
        }
        return {
          value: pairs[i++],
          done: false,
        };
      },
    };
  }
}

export const Dict = (entries) => new Dictionary(entries);
Dict.of = (obj) => new Dictionary(entries(obj));
Dict.isDict = (obj) => obj.type === "Dictionary";
Dict.empty = () => Dict.of({});

export const dict = Dict;
