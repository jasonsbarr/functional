import { entries } from "@jasonsbarr/functional-core/lib/object/entries.js";
import { definePropWithOpts } from "@jasonsbarr/functional-core/lib/object/definePropWithOpts.js";
import { equals } from "@jasonsbarr/functional-core/lib/object/equals.js";

const JsMap = Map;
const fst = (pair) => pair[0];
const snd = (pair) => pair[1];

function HashMap() {
  const HashMap = class HashMap extends JsMap {
    constructor(pairs) {
      super(pairs);

      this.keyrefs = [];

      for (let pair of pairs) {
        this.keyrefs.push(fst(pair));
      }

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

    has(key) {}

    get(key) {}
  };

  const Map = (...pairs) => new HashMap(pairs);

  Map.of = (obj) => new HashMap(entries(obj));
  Map.empty = () => new HashMap();

  return Map;
}

export default HashMap();
