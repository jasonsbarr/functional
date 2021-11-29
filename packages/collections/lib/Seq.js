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
      value: source.length,
    });
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

export const Seq = (source) =>
  isArray(source)
    ? new ArrayWrapper(source)
    : isNil(source)
    ? new ArrayWrapper([])
    : isString(source) ||
      isNumber(source) ||
      isBool(source) ||
      isSymbol(source) ||
      isDate(source) ||
      isRegExp(source)
    ? new ArrayWrapper([source])
    : isSet(source)
    ? new ArrayWrapper([...source])
    : isMap(source) ||
      Map.isMap(source) ||
      Dict.isDict(source) ||
      isObject(source)
    ? new EntriesWrapper(source)
    : Seq.isSeq(source)
    ? source
    : new Sequence(source);

Seq.of = (iter) => Seq(iter);
Seq.from = Seq.of;
Seq.isSeq = (obj) => obj.type === "Seq";
Seq.empty = () => Seq.of([]);
