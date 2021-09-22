import { all } from "../../functions/dict/all.js";
import { any } from "../../functions/dict/any.js";
import { append } from "../../functions/dict/append.js";
import { compact } from "../../functions/dict/compact.js";
import { clear } from "../../functions/dict/clear.js";
import { concat } from "../../functions/dict/concat.js";
import { copy } from "../../functions/dict/copy.js";
import { definePropWithOpts } from "../../functions/object/definePropWithOpts.js";
import { deleteValue } from "../../functions/dict/deleteValue.js";
import { entries } from "../../functions/object/entries.js";
import { equals } from "../../functions/object/equals.js";
import { index } from "../../functions/dict/dictIndex.js";
import { clone } from "../../functions/object/clone.js";
import { each } from "../../functions/dict/each.js";
import { eachWithKey } from "../../functions/dict/eachWithKey.js";
import { filter } from "../../functions/dict/filter.js";
import { filterKeys } from "../../functions/dict/filterKeys.js";
import { first } from "../../functions/dict/first.js";
import { freeze } from "../../functions/object/freeze.js";
import { get } from "../../functions/dict/get.js";
import { getWithDefault } from "../../functions/dict/getWithDefault.js";
import { has } from "../../functions/dict/has.js";
import { hash } from "../../functions/object/hash.js";
import { keys } from "../../functions/object/keys.js";
import { last } from "../../functions/dict/last.js";
import { length } from "../../functions/iterable/length.js";
import { map } from "../../functions/dict/map.js";
import { mapEntries } from "../../functions/dict/mapEntries.js";
import { mapKeys } from "../../functions/dict/mapKeys.js";
import { mapWithKey } from "../../functions/dict/mapWithKey.js";
import { merge } from "../../functions/dict/merge.js";
import { reduce } from "../../functions/dict/reduce.js";
import { reduceRight } from "../../functions/dict/reduceRight.js";
import { reject } from "../../functions/dict/reject.js";
import { reverse } from "../../functions/dict/reverse.js";
import { set } from "../../functions/dict/set.js";
import { toMap } from "../../functions/dict/toMap.js";
import { toObject } from "../../functions/dict/toObject.js";
import { toQueryString } from "../../functions/dict/toQueryString.js";
import { update } from "../../functions/dict/update.js";
import { values } from "../../functions/object/values.js";
import { concatToArray } from "../../functions/iterable/concatToArray.js";
import { fromEntries } from "../../functions/object/fromEntries.js";
import { count } from "../../functions/dict/count.js";
import { find } from "../../functions/dict/find.js";
import { findKey } from "../../functions/dict/findKey.js";
import { findEntry } from "../../functions/dict/findEntry.js";

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

    definePropWithOpts("kind", this, {
      enumerable: false,
      writable: false,
      configurable: false,
      value: "Dictionary",
    });

    freeze(this);
  }

  all(search) {
    return all(search, this);
  }

  any(search) {
    return any(search, this);
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

  flatten(level = Infinity) {
    let result = flattenEntries(entries(this));
    return Dict.of(fromEntries(result));

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

  mapWithKey(fn) {
    return Dict.of(mapWithKey(fn, this));
  }

  merge(...others) {
    return Dict.of(merge(this, ...others));
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

  reverse() {
    return Dict.of(reverse(this));
  }

  set(key, value) {
    return Dict.of(set(key, value, this));
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
Dict.isDict = (obj) => obj.kind === "Dictionary";

export const dict = Dict;
