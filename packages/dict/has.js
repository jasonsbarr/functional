import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";

export const has = curry((key, dict) => key in dict);
