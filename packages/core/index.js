import { ap } from "./lib/core/ap.js";
import { chain } from "./lib/core/chain.js";
import { compare } from "./lib/core/compare.js";
import { compose } from "./lib/core/compose.js";
import { composeR } from "./lib/core/composeR.js";
import { concat } from "./lib/core/concat.js";
import { createType, extendType, VariantInfo } from "./lib/types/createType.js";
import { curry } from "./lib/core/curry.js";
import { curryN } from "./lib/core/curryN.js";
import { defer } from "./lib/lambda/defer.js";
import { Either, Left, Right } from "./lib/types/Either.js";
import { empty } from "./lib/core/empty.js";
import { equals } from "./lib/core/equals.js";
import { failure } from "./lib/core/failure.js";
import { fold } from "./lib/core/fold.js";
import { fst } from "./lib/core/fst.js";
import { getType } from "./lib/types/getType.js";
import { gt } from "./lib/core/gt.js";
import { gte } from "./lib/core/gte.js";
import { head } from "./lib/core/head.js";
import { Id } from "./lib/types/Id.js";
import { last } from "./lib/core/last.js";
import { length } from "./lib/core/length.js";
import { liftA2 } from "./lib/helpers/liftA2.js";
import { liftA3 } from "./lib/helpers/liftA3.js";
import { liftA4 } from "./lib/helpers/liftA4.js";
import { liftA5 } from "./lib/helpers/liftA5.js";
import { lt } from "./lib/core/lt.js";
import { lte } from "./lib/core/lte.js";
import { map } from "./lib/core/map.js";
import { memo } from "./lib/core/memo.js";
import { now } from "./lib/date/now.js";
import { of } from "./lib/core/of.js";
import { once } from "./lib/lambda/once.js";
import { Option, safe, Some, None } from "./lib/types/Option.js";
import { pair } from "./lib/core/pair.js";
import { pipe } from "./lib/core/pipe.js";
import { Record, record } from "./lib/types/Record.js";
import { reduce } from "./lib/core/reduce.js";
import { Result, tryCatch, Ok, Err } from "./lib/types/Result.js";
import { snd } from "./lib/core/snd.js";
import { switchType } from "./lib/types/switchType.js";
import { tail } from "./lib/core/tail.js";
import { zero } from "./lib/core/zero.js";

import * as array from "./lib/array.js";
import { boolean as bool } from "./lib/boolean/boolean.js";
import * as date from "./lib/date.js";

export const identity = (x) => x;
export const noop = () => {};
export const unit = () => null;

export {
  ap,
  chain,
  compare,
  array,
  bool,
  compose,
  composeR,
  concat,
  createType,
  curry,
  curryN,
  date,
  defer,
  Either,
  empty,
  equals,
  Err,
  extendType,
  failure,
  fold,
  fst,
  getType,
  gt,
  gte,
  head,
  last,
  Left,
  length,
  liftA2,
  liftA3,
  liftA4,
  liftA5,
  lt,
  lte,
  Id,
  map,
  memo,
  None,
  now,
  of,
  Ok,
  once,
  Option,
  pair,
  pipe,
  Record,
  record,
  reduce,
  Result,
  Right,
  safe,
  snd,
  Some,
  switchType,
  tail,
  tryCatch,
  VariantInfo,
  zero,
};
