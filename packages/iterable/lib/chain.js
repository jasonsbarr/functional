import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { map } from "./map.js";
import { flatten } from "./flatten.js";

export const chain = curry((fn, iter) => map(fn, flatten(iter)));
