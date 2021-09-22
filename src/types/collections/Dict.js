import { length } from "../../functions/iterable/length.js";
import { keys } from "../../functions/object/keys.js";
import { entries } from "../../functions/object/entries.js";
import { definePropWithOpts } from "../../functions/object/definePropWithOpts.js";
import { freeze } from "../../functions/object/freeze.js";
import { clear } from "../../functions/dict/clear.js";
import { concat } from "../../functions/dict/concat.js";
import { copy } from "../../functions/dict/copy.js";
import { deleteValue } from "../../functions/dict/deleteValue.js";
import { index } from "../../functions/dict/dictIndex.js";
import { clone } from "../../functions/object/clone.js";
import { each } from "../../functions/dict/each.js";
import { eachWithKey } from "../../functions/dict/eachWithKey.js";
import { get } from "../../functions/dict/get.js";
import { getWithDefault } from "../../functions/dict/getWithDefault.js";
import { has } from "../../functions/dict/has.js";
import { map } from "../../functions/dict/map.js";
import { mapEntries } from "../../functions/dict/mapEntries.js";
import { mapKeys } from "../../functions/dict/mapKeys.js";
import { mapWithKey } from "../../functions/dict/mapWithKey.js";
import { merge } from "../../functions/dict/merge.js";
import { set } from "../../functions/dict/set.js";
import { toMap } from "../../functions/dict/toMap.js";
import { toObject } from "../../functions/dict/toObject.js";
import { toQueryString } from "../../functions/dict/toQueryString.js";
import { update } from "../../functions/dict/update.js";
import { values } from "../../functions/object/values.js";
import { equals } from "../../functions/object/equals.js";
import { hash } from "../../functions/object/hash.js";

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

  clear() {
    return Dict.of(clear(this));
  }

  concat(other) {
    return Dict.of(concat(this, other));
  }

  // deep copy
  clone() {
    return Dict.of(clone(this));
  }

  // shallow copy
  copy() {
    return Dict.of(copy(this));
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

  entries() {
    return entries(this);
  }

  equals(other) {
    return equals(this, other);
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
