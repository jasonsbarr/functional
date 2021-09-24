import { conversions } from "./conversions/index.js";
import { All } from "./monoids/All.js";
import { Any } from "./monoids/Any.js";
import { Assign } from "./monoids/Assign.js";
import { Effect } from "./Effect.js";
import { Either } from "./Either.js";
import { Endo } from "./monoids/Endo.js";
import { First } from "./monoids/First.js";
import { Future } from "./Future.js";
import { Id } from "./Id.js";
import { Last } from "./monoids/Last.js";
import { Max } from "./monoids/Max.js";
import { Min } from "./monoids/Min.js";
import { Option } from "./Option.js";
import { Pair } from "./Pair.js";
import { Product } from "./monoids/Product.js";
import { Range } from "./Range.js";
import { Record } from "./Record.js";
import { Result } from "./Result.js";
import { Sum } from "./monoids/Sum.js";
import * as typeClasses from "./typeClasses.js";

export default {
  conversions,
  All,
  Any,
  Assign,
  Effect,
  Either,
  Endo,
  First,
  Future,
  Id,
  Last,
  Max,
  Min,
  Option,
  Pair,
  Product,
  Range,
  Record,
  Result,
  Sum,
  typeClasses,
};
