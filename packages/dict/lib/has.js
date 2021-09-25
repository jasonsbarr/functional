import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";

export const has = curry((key, dict) => key in dict);
