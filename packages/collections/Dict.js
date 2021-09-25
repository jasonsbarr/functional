import { all } from "@jasonsbarr/dict/all.js";
import { any } from "@jasonsbarr/dict/any.js";
import { append } from "@jasonsbarr/dict/append.js";
import { compact } from "@jasonsbarr/dict/compact.js";
import { clear } from "@jasonsbarr/dict/clear.js";
import { concat } from "@jasonsbarr/dict/concat.js";
import { copy } from "@jasonsbarr/dict/copy.js";
import { definePropWithOpts } from "@jasonsbarr/functional-core/functions/object/definePropWithOpts.js";
import { deleteValue } from "@jasonsbarr/dict/deleteValue.js";
import { entries } from "@jasonsbarr/functional-core/functions/object/entries.js";
import { equals } from "@jasonsbarr/functional-core/functions/object/equals.js";
import { index } from "@jasonsbarr/dict/index.js";
import { clone } from "@jasonsbarr/functional-core/functions/object/clone.js";
import { each } from "@jasonsbarr/dict/each.js";
import { eachWithKey } from "@jasonsbarr/dict/eachWithKey.js";
import { filter } from "@jasonsbarr/dict/filter.js";
import { filterKeys } from "@jasonsbarr/dict/filterKeys.js";
import { first } from "@jasonsbarr/dict/first.js";
import { freeze } from "@jasonsbarr/functional-core/functions/object/freeze.js";
import { get } from "@jasonsbarr/dict/get.js";
import { getWithDefault } from "@jasonsbarr/dict/getWithDefault.js";
import { has } from "@jasonsbarr/dict/has.js";
import { hash } from "@jasonsbarr/functional-core/functions/object/hash.js";
import { keys } from "@jasonsbarr/functional-core/functions/object/keys.js";
import { last } from "@jasonsbarr/dict/last.js";
import { length } from "@jasonsbarr/iterable/length.js";
import { map } from "@jasonsbarr/dict/map.js";
import { mapEntries } from "@jasonsbarr/dict/mapEntries.js";
import { mapKeys } from "@jasonsbarr/dict/mapKeys.js";
import { merge } from "@jasonsbarr/dict/merge.js";
import { reduce } from "@jasonsbarr/dict/reduce.js";
import { reduceRight } from "@jasonsbarr/dict/reduceRight.js";
import { reject } from "@jasonsbarr/dict/reject.js";
import { reverse } from "@jasonsbarr/dict/reverse.js";
import { set } from "@jasonsbarr/dict/set.js";
import { toMap } from "@jasonsbarr/dict/toMap.js";
import { toObject } from "@jasonsbarr/dict/toObject.js";
import { toQueryString } from "@jasonsbarr/dict/toQueryString.js";
import { update } from "@jasonsbarr/dict/update.js";
import { values } from "@jasonsbarr/functional-core/functions/object/values.js";
import { concatToArray } from "@jasonsbarr/iterable/concatToArray.js";
import { fromEntries } from "@jasonsbarr/functional-core/functions/object/fromEntries.js";
import { count } from "@jasonsbarr/dict/count.js";
import { find } from "@jasonsbarr/dict/find.js";
import { findKey } from "@jasonsbarr/dict/findKey.js";
import { findEntry } from "@jasonsbarr/dict/findEntry.js";
import { join } from "@jasonsbarr/dict/join.js";
import { none } from "@jasonsbarr/dict/none.js";
import { pluck } from "@jasonsbarr/dict/pluck.js";
import { prepend } from "@jasonsbarr/dict/prepend.js";
import { removeByKey } from "@jasonsbarr/dict/removeByKey.js";
import { removeByValue } from "@jasonsbarr/dict/removeByValue.js";
import { identity } from "@jasonsbarr/functional-core/functions/helpers/identity.js";
import { sort } from "@jasonsbarr/dict/sort.js";

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
