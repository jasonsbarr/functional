import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";

export const join = curry((sep, iter) => [...iter].join(sep));
