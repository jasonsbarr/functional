import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { all as allI } from "@jasonsbarr/functional-core/functions/iterable/all.js";
import { values } from "@jasonsbarr/functional-core/functions/object/values.js";

export const all = curry((search, dict) => allI(search, values(dict)));
