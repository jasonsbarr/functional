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
import { includesFromStart } from "@jasonsbarr/functional-core/lib/string/includesFromStart.js";
import { indexOf } from "@jasonsbarr/functional-core/lib/string/indexOf.js";
import { indexOfFromStart } from "@jasonsbarr/functional-core/lib/string/indexOfFromStart.js";
import { lastIndexOf } from "@jasonsbarr/functional-core/lib/string/lastIndexOf.js";
import { lastIndexOfFromEnd } from "@jasonsbarr/functional-core/lib/string/lastIndexOfFromEnd.js";
import { length } from "@jasonsbarr/functional-core/lib/string/length.js";
import { localeCompare } from "@jasonsbarr/functional-core/lib/string/localeCompare.js";
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

  includes(subStr, start) {
    if (isString(subStr)) {
      return this.fold(includes(subStr, start));
    }
    return this.fold(includes(subStr.value, start));
  },

  includesFromStart(subStr) {
    if (isString(subStr)) {
      return this.fold(includesFromStart(subStr, this.value));
    }
    return this.fold(includesFromStart(subStr.value, this.value));
  },

  indexOf(subStr, startIndex) {
    if (isString(subStr)) {
      return this.fold(indexOf(subStr, startIndex));
    }
    return this.fold(indexOf(subStr.value, startIndex));
  },

  indexOfFromStart(subStr) {
    if (isString(subStr)) {
      return this.fold(indexOfFromStart(subStr));
    }
    return this.fold(indexOfFromStart(subStr.value));
  },

  lastIndexOf(subStr, startIndex) {
    if (isString(subStr)) {
      return this.fold(lastIndexOf(subStr, startIndex));
    }
    return this.fold(lastIndexOf(subStr.value, startIndex));
  },

  lastIndexOfFromEnd(subStr) {
    if (isString(subStr)) {
      return this.fold(lastIndexOfFromEnd(subStr));
    }
    return this.fold(lastIndexOfFromEnd(subStr.value));
  },

  localeCompare(other) {
    if (isString(other)) {
      return this.fold(localeCompare(other));
    }
    return this.fold(localeCompare(other.value));
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

  definePropWithOpts("length", str, {
    writable: false,
    configurable: false,
    enumerable: false,
    value: length(string),
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
