import { definePropWithOpts } from "@jasonsbarr/functional-core/lib/object/definePropWithOpts.js";
import { create } from "@jasonsbarr/functional-core/lib/object/create.js";
import { setProto } from "@jasonsbarr/functional-core/lib/object/setProto.js";
import {
  Functor,
  Fold,
} from "@jasonsbarr/functional-core/lib/types/typeClasses.js";
import { splitGrapheme } from "./splitGrapheme.js";
import { toUpperCase } from "@jasonsbarr/functional-core/lib/string/toUpperCase.js";

const strProto = {
  get value() {
    return this._value;
  },
  ...Fold,
  ...Functor,

  splitGrapheme() {
    return this.fold(splitGrapheme);
  },

  toUpperCase() {
    return this.map(toUpperCase);
  },
};

setProto(null, strProto);

export const Str = (string) => {
  let str = create(null);

  setProto(strProto);

  definePropWithOpts("_value", str, {
    writable: false,
    configurable: false,
    enumerable: false,
    value: string,
  });

  definePropWithOpts("constructor", str, {
    writable: false,
    configurable: false,
    enumerable: false,
    value: Str,
  });

  return str;
};

console.log(Str("hello").splitGrapheme());
