import { definePropWithOpts } from "@jasonsbarr/functional-core/lib/object/definePropWithOpts.js";
import { create } from "@jasonsbarr/functional-core/lib/object/create.js";
import { assign } from "@jasonsbarr/functional-core/lib/object/assign.js";
import { isString } from "@jasonsbarr/functional-core/lib/predicates/isString.js";
import { isRegExp } from "@jasonsbarr/functional-core/lib/predicates/isRegExp.js";
import {
  Applicative,
  Apply,
  Chain,
  Functor,
  Fold,
  Monoid,
  SemiGroup,
  Setoid,
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
import { match } from "@jasonsbarr/functional-core/lib/string/match.js";
import { matchAll } from "@jasonsbarr/functional-core/lib/string/matchAll.js";
import { normalize } from "@jasonsbarr/functional-core/lib/string/normalize.js";
import { padEnd } from "@jasonsbarr/functional-core/lib/string/padEnd.js";
import { padStart } from "@jasonsbarr/functional-core/lib/string/padStart.js";
import { repeat } from "@jasonsbarr/functional-core/lib/string/repeat.js";
import { replace } from "@jasonsbarr/functional-core/lib/string/replace.js";
import { replaceAll } from "@jasonsbarr/functional-core/lib/string/replaceAll.js";
import { search } from "@jasonsbarr/functional-core/lib/string/search.js";
import { slice } from "@jasonsbarr/functional-core/lib/string/slice.js";
import { split } from "@jasonsbarr/functional-core/lib/string/split.js";
import { splitGrapheme } from "./splitGrapheme.js";
import { startsWith } from "@jasonsbarr/functional-core/lib/string/startsWith.js";
import { startsWithFromStart } from "@jasonsbarr/functional-core/lib/string/startsWithFromStart.js";
import { substring } from "@jasonsbarr/functional-core/lib/string/substring.js";
import { to } from "@jasonsbarr/functional-core/lib/string/to.js";
import { toLocaleLowerCase } from "@jasonsbarr/functional-core/lib/string/toLocaleLowerCase.js";
import { toLocaleUpperCase } from "@jasonsbarr/functional-core/lib/string/toLocaleUpperCase.js";
import { toLowerCase } from "@jasonsbarr/functional-core/lib/string/toLowerCase.js";
import { toUpperCase } from "@jasonsbarr/functional-core/lib/string/toUpperCase.js";
import { trim } from "@jasonsbarr/functional-core/lib/string/trim.js";
import { trimEnd } from "@jasonsbarr/functional-core/lib/string/trimEnd.js";
import { trimStart } from "@jasonsbarr/functional-core/lib/string/trimStart.js";

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
  ...Setoid,

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

  match(regexp) {
    return this.fold(match(regexp));
  },

  matchAll(regexp) {
    return this.fold(matchAll(regexp));
  },

  normalize() {
    return this.map(normalize);
  },

  padEnd(targetLength, padString) {
    if (isString(padString)) {
      return this.map(padEnd(targetLength, padString));
    }
    return this.map(padEnd(targetLength, padString.value));
  },

  padStart(targetLength, padString) {
    if (isString(padString)) {
      return this.map(padStart(targetLength, padString));
    }
    return this.map(padStart(targetLength, padString.value));
  },

  repeat(times) {
    return this.map(repeat(times));
  },

  replace(search, replacement) {
    if (isString(search)) {
      if (isString(replacement)) {
        return this.map(replace(search, replacement));
      }
      return this.map(replace(search, replacement.value));
    } else if (isString(replacement)) {
      return this.map(replace(search.value, replacement));
    }
    return this.map(replace(search.value, replacement.value));
  },

  replaceAll(search, replacement) {
    if (isString(search) || isRegExp(search)) {
      if (isString(replacement)) {
        return this.map(replaceAll(search, replacement));
      }
      return this.map(replaceAll(search, replacement.value));
    } else if (isString(replacement)) {
      return this.map(replaceAll(search.value, replacement));
    }
    return this.map(replaceAll(search.value, replacement.value));
  },

  search(regexp) {
    return this.fold(search(regexp));
  },

  slice(start, end) {
    return this.map(slice(start, end));
  },

  split(splitter = "") {
    if (isString(splitter)) {
      return this.fold(split(splitter));
    }
    return this.fold(split(splitter.value));
  },

  splitGrapheme() {
    return this.fold(splitGrapheme);
  },

  startsWith(search, startIndex) {
    if (isString(search)) {
      return this.fold(startsWith(search, startIndex));
    }
    return this.fold(startsWith(search.value, startIndex));
  },

  startsWithFromStart(search) {
    if (isString(search)) {
      return this.fold(startsWithFromStart(search));
    }
    return this.fold(startsWithFromStart(search.value));
  },

  substring(start, end) {
    return this.map(substring(start, end));
  },

  to(end) {
    return this.map(to(end));
  },

  toLocaleLowerCase(locales) {
    return this.map(toLocaleLowerCase(locales));
  },

  toLocaleUpperCase(locales) {
    return this.map(toLocaleUpperCase(locales));
  },

  toLowerCase() {
    return this.map(toLowerCase);
  },

  toUpperCase() {
    return this.map(toUpperCase);
  },

  trim() {
    return this.map(trim);
  },

  trimEnd() {
    return this.map(trimEnd);
  },

  trimStart() {
    return this.map(trimStart);
  },

  inspect() {
    return `Str(${this.value})`;
  },

  toString() {
    return this.value;
  },

  valueOf() {
    return this.value;
  },
};

export const Str = (string) => {
  let str = create(strProto);

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
