import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { splice } from "./splice.js";

export const insert = curry((item, i, iter) => splice(iter, i, 0, item));
