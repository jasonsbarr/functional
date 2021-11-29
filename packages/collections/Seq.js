import { isArray } from "@jasonsbarr/functional-core/lib/predicates/isArray.js";

class Sequence {
  constructor(source) {
    this.source = source;
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

export const Seq = (iter) =>
  isArray(iter)
    ? new ArrayWrapper(iter)
    : Seq.isSeq(iter)
    ? iter
    : new Sequence(iter);

Seq.of = (iter) => Seq(iter);
Seq.from = Seq.of;
Seq.isSeq = (obj) => obj.type === "Seq";
Seq.empty = () => Seq.of([]);
