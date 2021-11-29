import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { prop } from "@jasonsbarr/functional-core/lib/object/prop.js";
import { Option } from "@jasonsbarr/functional-core";
import { map } from "./map.js";
import { reject } from "./reject.js";
import { sequence } from "./sequence.js";

// prop returns an Option, so we reject all None values, sequence the result
// into an Option of the mapped iterable, then fold into the final iterable
export const pluck = curry((p, iter) =>
  sequence(
    Option.of,
    reject((el) => Option.isNone(el), map(prop(p), iter))
  ).fold(
    () => iter.constructor(...[]),
    (x) => x
  )
);
