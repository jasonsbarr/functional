class Sequence {
  constructor(source) {
    this.source = source;
  }
}

class MappedSequence extends Sequence {}

class FilteredSequence extends Sequence {}

export const Seq = (iter) => new Sequence(iter);

Seq.of = (iter) => Seq(iter);
Seq.from = Seq.of;
Seq.isSeq = (obj) => obj.type === "Seq";
Seq.empty = () => Seq.of([]);
