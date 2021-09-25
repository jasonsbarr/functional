import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { values } from "@jasonsbarr/functional-core/object/values.js";

export const join = curry((sep, dict) => values(dict).join(sep));
