import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { all as allI } from "@jasonsbarr/iterable/all.js";
import { values } from "@jasonsbarr/functional-core/object/values.js";

export const all = curry((search, dict) => allI(search, values(dict)));
