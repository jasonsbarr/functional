import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { any as anyI } from "@jasonsbarr/iterable/any.js";
import { values } from "@jasonsbarr/functional-core/object/values.js";

export const any = curry((search, dict) => anyI(search, values(dict)));
