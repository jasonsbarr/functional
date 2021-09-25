import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";

export const join = curry((sep, iter) => [...iter].join(sep));
