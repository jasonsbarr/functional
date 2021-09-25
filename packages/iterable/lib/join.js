import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";

export const join = curry((sep, iter) => [...iter].join(sep));
