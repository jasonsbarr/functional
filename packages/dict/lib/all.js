import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { all as allI } from "@jasonsbarr/iterable/lib/all.js";
import { values } from "@jasonsbarr/functional-core/lib/object/values.js";

export const all = curry((search, dict) => allI(search, values(dict)));
