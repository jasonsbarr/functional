import { entries } from "@jasonsbarr/functional-core/lib/object/entries.js";
import { definePropWithOpts } from "@jasonsbarr/functional-core/lib/object/definePropWithOpts.js";
import { equals } from "@jasonsbarr/functional-core/lib/object/equals.js";
import { find } from "@jasonsbarr/iterable/lib/find.js";
import { Option } from "@jasonsbarr/functional-core/lib/types/Option.js";
import { JsMap } from "./internal/_JsMap.js";

const fst = (pair) => pair[0];
const snd = (pair) => pair[1];

const HashMap = class HashMap extends JsMap {
  constructor(pairs) {
    super(pairs);

    const keyrefs = [];

    for (let pair of pairs) {
      keyrefs.push(fst(pair));
    }

    definePropWithOpts("keyrefs", this, {
      enumerable: false,
      writable: false,
      configurable: false,
      value: keyrefs,
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
  }

  get(key) {
    return this.lookup(key).chain((k) => Option.of(super.get(k)));
  }

  has(key) {
    return this.lookup(key).fold(
      () => false,
      () => true
    );
  }

  hasValue(value) {
    return find(value, this.entries()).fold(
      () => false,
      () => true
    );
  }

  // returns Option
  lookup(key) {
    return find(key, this.keyrefs);
  }
};

const Map = (...pairs) => new HashMap(pairs);

// works with an Object or a JsMap
Map.of = (obj) => new HashMap(entries(obj));
Map.empty = () => new HashMap();

export { Map };

export default Map;
