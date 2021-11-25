import { ap } from "./core/ap.js";
import { compose } from "./core/compose.js";
import { composeR } from "./core/composeR.js";
import { concat } from "./core/concat.js";
import { createType } from "./types/createType.js";
import { curry } from "./core/curry.js";
import { curryN } from "./core/curryN.js";
import { defer } from "./lambda/defer.js";
import { Either } from "./types/Either";
import { empty } from "./core/empty.js";
import { equals } from "./core/equals.js";
import { failure } from "./core/failure.js";
import { fst } from "./core/fst.js";
import { getType } from "./types/getType.js";
import { gt } from "./core/gt.js";
import { gte } from "./core/gte.js";
import { head } from "./core/head.js";
import { Id } from "./types/Id.js";
import { last } from "./core/last.js";
import { length } from "./core/length.js";
import { liftA2 } from "./helpers/liftA2.js";
import { liftA3 } from "./helpers/liftA3.js";
import { liftA4 } from "./helpers/liftA4.js";
import { liftA5 } from "./helpers/liftA5.js";
import { lt } from "./core/lt.js";
import { lte } from "./core/lte.js";
import { map } from "./core/map.js";
import { now } from "./date/now.js";
import { of } from "./core/of.js";
import { once } from "./lambda/once.js";
import { Option, safe } from "./types/Option.js";
import { pair } from "./core/pair.js";
import { pipe } from "./core/pipe.js";
import { Record, record } from "./types/Record.js";
import { reduce } from "./core/reduce.js";
import { Result, tryCatch } from "./types/Result.js";
import { snd } from "./core/snd.js";
import { switchType } from "./types/switchType.js";
import { tail } from "./core/tail.js";
import { VariantInfo } from "./types/createType.js";

export const identity = (x) => x;
export const noop = () => {};
export const unit = () => null;

export {
  ap,
  compose,
  composeR,
  concat,
  createType,
  curry,
  curryN,
  defer,
  Either,
  empty,
  equals,
  failure,
  fst,
  getType,
  gt,
  gte,
  head,
  last,
  length,
  liftA2,
  liftA3,
  liftA4,
  liftA5,
  lt,
  lte,
  Id,
  map,
  now,
  of,
  once,
  Option,
  pair,
  pipe,
  Record,
  record,
  reduce,
  Result,
  safe,
  snd,
  switchType,
  tail,
  tryCatch,
  VariantInfo,
};
