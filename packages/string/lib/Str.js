import { definePropWithOpts } from "@jasonsbarr/functional-core/lib/object/definePropWithOpts.js";
import { create } from "@jasonsbarr/functional-core/lib/object/create.js";
import { setProto } from "@jasonsbarr/functional-core/lib/object/setProto.js";
import { assign } from "@jasonsbarr/functional-core/lib/object/assign.js";
import { isString } from "@jasonsbarr/functional-core/lib/predicates/isString.js";
import {
  Applicative,
  Apply,
  Chain,
  Functor,
  Fold,
  Monoid,
  SemiGroup,
} from "@jasonsbarr/functional-core/lib/types/typeClasses.js";
import { charAt } from "@jasonsbarr/functional-core/lib/string/charAt.js";
import { charCodeAt } from "@jasonsbarr/functional-core/lib/string/charCodeAt.js";
import { codePointAt } from "@jasonsbarr/functional-core/lib/string/codePointAt.js";
import { concat } from "@jasonsbarr/functional-core/lib/string/concat.js";
import { endsWith } from "@jasonsbarr/functional-core/lib/string/endsWith.js";
import { from } from "@jasonsbarr/functional-core/lib/string/from.js";
import { fromCharCode } from "@jasonsbarr/functional-core/lib/string/fromCharCode.js";
import { fromCodePoint } from "@jasonsbarr/functional-core/lib/string/fromCodePoint.js";
import { includes } from "@jasonsbarr/functional-core/lib/string/includes.js";
import { splitGrapheme } from "./splitGrapheme.js";
import { toUpperCase } from "@jasonsbarr/functional-core/lib/string/toUpperCase.js";

const strProto = {
  get value() {
    return this._value;
  },

  type: "Str",
  variant: "Str",

  ...Apply,
  ...Chain,
  ...Fold,
  ...Functor,
  ...SemiGroup,

  charAt(index) {
    return this.map(charAt(index));
  },

  charCodeAt(index) {
    return this.fold(charCodeAt(index));
  },

  codePointAt(index) {
    return this.fold(codePointAt(index));
  },

  concat(other) {
    if (isString(other)) {
      return this.map(concat(this.value, other));
    }
    return this.map(concat(this.value, other.value));
  },

  endsWith(endStr) {
    if (isString(endStr)) {
      return this.fold(endsWith(endStr));
    }
    return this.fold(endsWith(endStr.value));
  },

  from(index) {
    return this.map(from(index));
  },

  includes(subStr) {
    if (isString(subStr)) {
      return this.fold(includes(subStr));
    }
    return this.fold(includes(subStr.value));
  },

  splitGrapheme() {
    return this.fold(splitGrapheme);
  },

  toUpperCase() {
    return this.map(toUpperCase);
  },

  inspect() {
    return `Str(${this.value})`;
  },

  toString() {
    return this.inspect();
  },

  valueOf() {
    return this.value;
  },
};

export const Str = (string) => {
  let str = create(null);

  str = setProto(strProto, str);

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

assign(Str, Applicative);
assign(Str, Monoid);

Str.of = (string) => Str(string);
Str.empty = () => Str("");
Str.fromCharCode = (...codes) => Str(fromCharCode(...codes));
Str.fromCodePoint = (...points) => Str(fromCodePoint(...points));
