import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { values } from "@jasonsbarr/functional-core/lib/object/values.js";

export const join = curry((sep, dict) => values(dict).join(sep));
