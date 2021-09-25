import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { reject } from "./reject.js";

export const removeByKey = curry((key, dict) =>
  reject((_, k) => k === key, dict)
);
