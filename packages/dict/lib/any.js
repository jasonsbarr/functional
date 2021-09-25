import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { any as anyI } from "@jasonsbarr/iterable/lib/any.js";
import { values } from "@jasonsbarr/functional-core/lib/object/values.js";

export const any = curry((search, dict) => anyI(search, values(dict)));
