import { entries } from "@jasonsbarr/functional-core/lib/object/entries.js";
import { definePropWithOpts } from "@jasonsbarr/functional-core/lib/object/definePropWithOpts.js";
import { find } from "@jasonsbarr/iterable/lib/find.js";
import { equals } from "@jasonsbarr/functional-core/lib/object/equals.js";
import { Option } from "@jasonsbarr/functional-core/lib/types/Option.js";
import { identity } from "@jasonsbarr/functional-core/lib/helpers/identity.js";
import { isMap } from "@jasonsbarr/functional-core/lib/predicates/isMap.js";
import { JsMap } from "./internal/_JsMap.js";
import { freeze } from "@jasonsbarr/functional-core/lib/object/freeze.js";

const fst = (pair) => pair[0];
const snd = (pair) => pair[1];

class HashMap {
  constructor(pairs) {
    const keyrefs = [];
    this.map = new JsMap();

    for (let pair of pairs) {
      this.map.set(fst(pair), snd(pair));
      keyrefs.push(fst(pair));
    }

    definePropWithOpts("keyrefs", this, {
      enumerable: false,
      writable: false,
      configurable: false,
      value: keyrefs,
    });

    definePropWithOpts("size", this, {
      enumerable: false,
      writable: false,
      configurable: false,
      value: this.map.size,
    });

    definePropWithOpts("type", this, {
      enumerable: false,
      writable: false,
      configurable: false,
      value: "Map",
    });

    definePropWithOpts("constructor", this, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Map,
    });

    freeze(this.map);
    freeze(this);
  }

  clear() {
    return Map.of(new JsMap());
  }

  concat(other) {
    let m = new JsMap();

    for (let [k, v] of this.entries()) {
      m.set(k, v);
    }

    for (let [k, v] of other.entries()) {
      m.set(k, v);
    }

    return Map.of(m);
  }

  copy() {
    let m = new JsMap();

    for (let [k, v] of this.entries()) {
      m.set(k, v);
    }

    return Map.of(m);
  }

  delete(key) {
    let m = new JsMap(this.map.entries());
    let k = this.lookup(key).fold(() => null, identity);

    if (k) {
      m.delete(k);
    }

    return Map.of(m);
  }

  entries() {
    return [...this.map.entries()];
  }

  equals(other) {
    return equals(other, this);
  }

  filter(pred) {
    let m = new JsMap();

    for (let [k, v] of this.entries()) {
      if (pred(v)) {
        m.set(k, v);
      }
    }

    return Map.of(m);
  }

  forEach(fn) {
    this.map.forEach(fn);
  }

  get(key) {
    return this.lookup(key).chain((k) => Option.of(this.map.get(k)));
  }

  getWithDefault(key, defaultValue) {
    return this.get(key).fold(() => defaultValue, identity);
  }

  has(key) {
    return this.lookup(key).fold(
      () => false,
      () => true
    );
  }

  hasValue(value) {
    return find(value, this.values()).fold(
      () => false,
      () => true
    );
  }

  includes(key) {
    return this.has(key);
  }

  inspect() {
    return this.map.inspect();
  }

  keys() {
    return [...this.keyrefs];
  }

  // returns Option
  lookup(key) {
    return find(key, this.keyrefs);
  }

  map(fn) {
    let m = new JsMap();

    for (let [k, v] of this.entries()) {
      m.set(k, fn(v));
    }

    return Map.of(m);
  }

  mapEntries(fn) {
    let m = new JsMap();

    for (let [k, v] of this.entries()) {
      m.set(fn(k, v));
    }

    return Map.of(m);
  }

  mapKeys(fn) {
    let m = new JsMap();

    for (let [k, v] of this.entries()) {
      m.set(fn(k), v);
    }

    return Map.of(m);
  }

  reduce(reducer, initial) {
    let acc = initial;

    for (let [k, v] of this.entries()) {
      acc = reducer(acc, v, k);
    }

    return acc;
  }

  reduceRight(reducer, initial) {
    let acc = initial;

    for (let [k, v] of this.entries().reverse()) {
      acc = reducer(acc, v, v);
    }

    return acc;
  }

  reject(pred) {
    let m = new JsMap();

    for (let [k, v] of this.entries()) {
      if (!pred(v)) {
        m.set(k, v);
      }
    }

    return Map.of(m);
  }

  sequence(point) {
    return this.traverse(point, identity);
  }

  set(key, value) {
    return Map(...this.entries(), [key, value]);
  }

  toJSON() {
    return JSON.stringify(this.toObject());
  }

  toMap() {
    let m = new JsMap();

    for (let [k, v] of this.entries()) {
      m.set(k, v);
    }

    return m;
  }

  toObject() {
    let o = {};

    for (let [k, v] of this.entries()) {
      o[k] = v;
    }

    return o;
  }

  toString() {
    return this.map.toString();
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

  values() {
    return [...this.map.values()];
  }
}

const Map = (...pairs) => new HashMap(pairs);

// works with an Object, Map, or JsMap
Map.of = (obj) =>
  new HashMap(Map.isMap(obj) || isMap(obj) ? obj.entries() : entries(obj));
Map.empty = () => new HashMap();
Map.isMap = (obj) => obj.type === "Map";

export { Map };

export default Map;
