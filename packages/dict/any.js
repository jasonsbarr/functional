import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { any as anyI } from "@jasonsbarr/functional-core/functions/iterable/any.js";
import { values } from "@jasonsbarr/functional-core/functions/object/values.js";

export const any = curry((search, dict) => anyI(search, values(dict)));
