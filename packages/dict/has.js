import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";

export const has = curry((key, dict) => key in dict);
