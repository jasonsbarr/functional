import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { values } from "@jasonsbarr/functional-core/functions/object/values.js";

export const join = curry((sep, dict) => values(dict).join(sep));
